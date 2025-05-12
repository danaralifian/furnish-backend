import { Expose, Type } from 'class-transformer';
import { PaymentDto } from './payments.dto';

export class PaymentWebhookDto {
  @Expose()
  type: string;

  @Expose()
  table: string;

  @Expose()
  @Type(() => PaymentDto)
  record: PaymentDto;

  @Expose()
  schema: 'public';

  @Expose({ name: 'old_record' })
  @Type(() => PaymentDto)
  oldRecord: PaymentDto;
}
