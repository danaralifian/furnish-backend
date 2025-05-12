import { Expose } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';
import { PAYMENT_PROVIDER } from 'src/shared/enum/payment-provider';

export class CreatePaymentInvoiceDto {
  @IsNotEmpty()
  @Expose()
  provider: PAYMENT_PROVIDER;

  @IsNotEmpty()
  @Expose({ name: 'external_id' })
  externalId: string; //use order id

  @IsNotEmpty()
  @Expose()
  @Min(1)
  amount: number;

  @Expose({ name: 'payer_email' })
  payerEmail: string;

  @Expose()
  description: string;
}
