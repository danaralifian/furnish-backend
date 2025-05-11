import { Expose } from 'class-transformer';
import { PAYMENT_PROVIDER } from 'src/shared/enum/payment-provider';

export class PaymentProviderResponseDto {
  @Expose({ name: 'id' })
  paymentProviderId: string;

  @Expose()
  provider: PAYMENT_PROVIDER;

  @Expose({ name: 'external_id' })
  externalId: string;

  @Expose({ name: 'payment_method' })
  paymentMethodType: string;

  @Expose()
  status: string;

  @Expose()
  amount: number;

  @Expose({ name: 'paid_at' })
  paidAt: number;

  @Expose()
  description: string;

  @Expose()
  currency: string;

  @Expose({ name: 'payer_email' })
  payerEmail: string;

  @Expose({ name: 'invoice_url' })
  invoiceUrl: string;

  @Expose({ name: 'payment_channel' })
  paymentMethodName: string;

  @Expose({ name: 'expiry_date' })
  expiryDate: number;

  @Expose({ name: 'success_redirect_url' })
  successRedirectUrl: string;

  @Expose({ name: 'failure_redirect_url' })
  failureRedirectUrl: string;
}
