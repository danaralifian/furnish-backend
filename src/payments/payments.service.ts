import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaymentDto } from './dto/payments.dto';
import { CreatePaymentInvoiceDto } from './dto/create-payment-invoice.dto';
import { PaymentProviderResponseDto } from './dto/payment-provider-response.dto';
import { IResponse } from 'src/shared/interfaces/response';
import { formatResponse } from 'src/common/helpers/format-response';
import { plainToInstance } from 'class-transformer';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { DataSource, Repository } from 'typeorm';
import { PAYMENT_STATUS } from 'src/shared/enum/payment-status';
import { PaymentGatewayWebhookDto } from './dto/payment-gateway-webhook.dto';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { INVOICE_STATUS } from 'src/shared/enum/invoice-status';
import { Order } from 'src/orders/entities/order.entity';
import { ORDER_STATUS } from 'src/shared/enum/order-status';
import { mapToInvoiceStatus } from 'src/common/helpers/map-status';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,

    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async createPaymentInvoice(
    createPayment: CreatePaymentInvoiceDto,
  ): Promise<PaymentProviderResponseDto> {
    const username = process.env.XENDIT_SECRET_KEY;
    const password = '';

    const encodedAuth = Buffer.from(`${username}:${password}`).toString(
      'base64',
    );

    const payload = {
      external_id: createPayment.externalId,
      amount: createPayment.amount,
      payer_email: createPayment.payerEmail,
      description: createPayment.description,
      success_redirect_url: process.env.PAYMENT_SUCCESS_REDIRECT_URL,
      failure_redirect_url: process.env.PAYMENT_FAILURE_REDIRECT_URL,
      merchant_name: process.env.MERCHANT_NAME,
      merchant_profile_picture_url: process.env.MERCHANT_ICON,
    };

    try {
      const response = await fetch(
        `${process.env.XENDIT_BASE_URL}/v2/invoices`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${encodedAuth}`,
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        const error = await response.text();
        throw new BadRequestException(
          `Xendit API Error: ${response.status} - ${error}`,
        );
      }

      const createdBill = (await response.json()) as PaymentProviderResponseDto;

      return plainToInstance(
        PaymentProviderResponseDto,
        {
          ...createdBill,
          provider: createPayment.provider,
        },
        {
          excludeExtraneousValues: true,
        },
      );
    } catch (err) {
      console.error('Error creating invoice:', err);
      throw err;
    }
  }

  async createPaymentTest(
    createPayment: CreatePaymentInvoiceDto,
  ): Promise<IResponse<PaymentProviderResponseDto>> {
    const createdBill = await this.createPaymentInvoice(createPayment);
    return formatResponse(createdBill, PaymentProviderResponseDto);
  }

  async create(createPaymentDto: PaymentDto): Promise<IResponse<PaymentDto>> {
    const createdPayment = await this.paymentRepository.save(createPaymentDto);
    return formatResponse(createdPayment, PaymentDto);
  }

  async processSupabasePayment(
    paymentHook: PaymentDto,
  ): Promise<IResponse<PaymentDto>> {
    const data = plainToInstance(CreatePaymentInvoiceDto, paymentHook, {
      excludeExtraneousValues: true,
    });

    //create payment bill using payment gateway
    const bill = await this.createPaymentInvoice({
      amount: data.amount,
      description: `Invoice ID ${data.externalId}`,
      externalId: data.externalId,
      payerEmail: data.payerEmail,
      provider: data.provider,
    });

    // update payment
    await this.paymentRepository.update(
      { externalId: data.externalId },
      {
        ...plainToInstance(PaymentDto, bill),
        status: PAYMENT_STATUS.WAITING_PAYMENT,
      },
    );

    const getPayment = await this.paymentRepository.findOne({
      where: { externalId: data.externalId },
    });

    return formatResponse(getPayment, PaymentDto);
  }

  async webhookPayment(
    payment: PaymentGatewayWebhookDto,
  ): Promise<IResponse<PaymentGatewayWebhookDto>> {
    await this.dataSource.transaction(async (manager) => {
      const paymentSource = manager.getRepository(Payment);
      const invoiceSource = manager.getRepository(Invoice);
      const orderSource = manager.getRepository(Order);

      const existingPayment = await paymentSource.findOneBy({
        externalId: payment.externalId,
      });

      if (!existingPayment) {
        throw new NotFoundException('Payment not found');
      }

      // update status payment
      await paymentSource.update(
        { externalId: payment.externalId },
        {
          status: payment.status,
          paidAt: payment.paidAt ? new Date(payment.paidAt).getTime() : 0,
          paymentMethodName: payment.paymentChannel,
          paymentMethodType: payment.paymentMethod,
        },
      );

      // update status invoice
      await invoiceSource.update(
        { invoiceId: payment.externalId },
        {
          status: mapToInvoiceStatus(payment.status),
        },
      );

      // update status order
      await orderSource
        .createQueryBuilder('order')
        .update(Order)
        .set({
          status:
            payment.status == PAYMENT_STATUS.PAID
              ? ORDER_STATUS.PROCESSING
              : ORDER_STATUS.CANCELLED,
        })
        .where(
          `invoice_id IN (
      SELECT i.id
      FROM invoices i
      WHERE i.invoice_id = :invoiceId
    )  AND status = :pendingStatus`,
        )
        .setParameters({
          invoiceId: payment.externalId,
          pendingStatus: INVOICE_STATUS.PENDING,
        })
        .execute();
    });

    return formatResponse(payment, PaymentGatewayWebhookDto);
  }
}
