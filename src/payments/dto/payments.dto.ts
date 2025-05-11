import { Expose, Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Invoice } from 'src/invoices/entities/invoice.entity';
import { BaseDto } from 'src/shared/dto/base.dto';
import { PAYMENT_PROVIDER } from 'src/shared/enum/payment-provider';

export class PaymentDto extends BaseDto {
  @IsNotEmpty()
  @Expose()
  provider: PAYMENT_PROVIDER;

  @IsNotEmpty()
  @Expose()
  paymentProviderId: string;

  @IsNotEmpty()
  @Expose()
  description: string;

  @IsNotEmpty()
  @Expose()
  externalId: string;

  @IsNotEmpty()
  @Expose()
  status: string;

  @Expose()
  paymentMethodName: string;

  @Expose()
  paymentMethodType: string;

  @IsNotEmpty()
  @Expose()
  invoiceUrl: string;

  @IsNotEmpty()
  @Expose()
  successRedirectUrl: string;

  @IsNotEmpty()
  @Expose()
  failureRedirectUrl: string;

  @IsNotEmpty()
  @Expose()
  currency: string;

  @IsNotEmpty()
  @Expose()
  amount: number;

  @Expose()
  paidAt: number;

  @Expose()
  expiryDate: number;

  @IsNotEmpty()
  @Expose()
  @Type(() => Invoice)
  invoice: Invoice;
}
