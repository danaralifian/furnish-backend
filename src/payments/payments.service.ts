import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payments.dto';
import { CreateBillDto } from './dto/create-bill.dto';
import { PaymentProviderResponseDto } from './dto/payment-provider-response.dto';
import { IResponse } from 'src/shared/interfaces/response';
import { formatResponse } from 'src/common/helpers/format-response';
import { plainToInstance } from 'class-transformer';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from './entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createBill(
    createBillDto: CreateBillDto,
  ): Promise<PaymentProviderResponseDto> {
    const username = process.env.XENDIT_SECRET_KEY;
    const password = '';

    const encodedAuth = Buffer.from(`${username}:${password}`).toString(
      'base64',
    );

    const payload = {
      external_id: createBillDto.externalId,
      amount: createBillDto.amount,
      payer_email: createBillDto.payerEmail,
      description: createBillDto.description,
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
        throw new Error(`Xendit API Error: ${response.status} - ${error}`);
      }

      const createdBill = (await response.json()) as PaymentProviderResponseDto;

      return plainToInstance(PaymentProviderResponseDto, {
        ...createdBill,
        provider: createBillDto.provider,
      });
    } catch (err) {
      console.error('Error creating invoice:', err);
      throw err;
    }
  }

  async createBillTest(
    createBillDto: CreateBillDto,
  ): Promise<IResponse<PaymentProviderResponseDto>> {
    const createdBill = await this.createBill(createBillDto);
    return formatResponse(createdBill, PaymentProviderResponseDto);
  }

  async create(createPaymentDto: PaymentDto): Promise<IResponse<PaymentDto>> {
    const createdPayment = await this.paymentRepository.save(createPaymentDto);
    return formatResponse(createdPayment, PaymentDto);
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: PaymentDto) {
    console.log(updatePaymentDto);
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }
}
