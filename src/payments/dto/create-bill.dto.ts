import { Expose } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateBillDto {
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

  @Expose({ name: 'success_redirect_url' })
  successRedirectUrl: string;

  @Expose({ name: 'failure_redirect_url' })
  failureRedirectUrl: string;
}
