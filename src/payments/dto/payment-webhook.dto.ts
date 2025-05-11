import { Expose, Type } from 'class-transformer';
import { PaymentDto } from './payments.dto';

export class paymentWebhookDto {
  @Expose()
  type: string;

  @Expose()
  table: string;

  @Expose()
  @Type(() => PaymentDto)
  record: PaymentDto;

  @Expose()
  schema: 'public';

  @Expose()
  @Type(() => PaymentDto)
  old_record: null;
}
