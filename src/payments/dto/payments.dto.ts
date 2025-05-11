import { Expose } from 'class-transformer';
import { BaseDto } from 'src/shared/dto/base.dto';

export class PaymentDto extends BaseDto {
  @Expose()
  provider: string;

  @Expose()
  description: string;

  @Expose()
  externalId: string;

  @Expose()
  status: string;

  @Expose()
  paymentMethodName: string;

  @Expose() // payment_id from provider
  paymentId: string;

  @Expose()
  invoiceUrl: string;

  @Expose()
  successRedirectUrl: string;

  @Expose()
  failureRedirectUrl: string;

  @Expose()
  currency: string;

  @Expose()
  amount: number;

  @Expose()
  paidAt: number;

  @Expose()
  expiryDate: number;

  @Expose()
  invoiceId: number; // opsional, jika kamu ingin include invoice ID-nya
}
