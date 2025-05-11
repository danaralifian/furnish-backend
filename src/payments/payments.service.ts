import { Injectable } from '@nestjs/common';
import { PaymentDto } from './dto/payments.dto';
import { CreateBillDto } from './dto/create-bill.dto';
import { PaymentProvidderResponseDto } from './dto/payment-provider-response.dto';

@Injectable()
export class PaymentsService {
  async createBill(
    createBillDto: CreateBillDto,
  ): Promise<PaymentProvidderResponseDto> {
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
      success_redirect_url: createBillDto.successRedirectUrl,
      failure_redirect_url: createBillDto.failureRedirectUrl,
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

      const createdBill =
        (await response.json()) as PaymentProvidderResponseDto;

      return createdBill;
    } catch (err) {
      console.error('Error creating invoice:', err);
      throw err;
    }
  }

  create(createPaymentDto: PaymentDto) {
    console.log(createPaymentDto);
    return 'This action adds a new payment';
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
