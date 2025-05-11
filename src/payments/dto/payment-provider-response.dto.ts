import { Expose } from 'class-transformer';

export class PaymentProvidderResponseDto {
  @Expose()
  id: string;

  @Expose()
  status: string;

  @Expose({ name: 'external_id' })
  externalId: string;

  @Expose()
  amount: number;

  @Expose()
  currency: string;

  @Expose({ name: 'payer_email' })
  payerEmail: string;

  @Expose()
  description: string;

  @Expose({ name: 'invoice_url' })
  invoiceUrl: string;

  @Expose({ name: 'payment_method' })
  payment_method: string;

  @Expose({ name: 'payment_channel' })
  payment_channel: string;

  @Expose({ name: 'expiry_date' })
  expiryDate: number;

  @Expose({ name: 'success_redirect_url' })
  successRedirectUrl: string;

  @Expose({ name: 'failure_redirect_url' })
  failureRedirectUrl: string;

  @Expose({ name: 'paid_at' })
  paidAt: number;

  @Expose({ name: 'paid_amount' })
  paid_amount: number;
}
