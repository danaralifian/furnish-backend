import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { PAYMENT_STATUS } from 'src/shared/enum/payment-status';

export class PaymentGatewayWebhookDto {
  @IsString()
  id: string;

  @IsString()
  @Expose({ name: 'external_id' })
  externalId: string;

  @IsString()
  @Expose({ name: 'payment_method' })
  paymentMethod: string;

  @IsString()
  @Expose()
  status: PAYMENT_STATUS;

  @Expose()
  @IsNumber()
  amount: number;

  @IsNumber()
  @Expose({ name: 'paid_amount' })
  paidAmount: number;

  @Expose({ name: 'paid_at' })
  paidAt: number;

  @IsString()
  @Expose({ name: 'payment_channel' })
  paymentChannel: string;
}
