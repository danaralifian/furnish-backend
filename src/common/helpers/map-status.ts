import { INVOICE_STATUS } from 'src/shared/enum/invoice-status';
import { PAYMENT_STATUS } from 'src/shared/enum/payment-status';

export function mapToInvoiceStatus(status: unknown): INVOICE_STATUS {
  switch (status) {
    case PAYMENT_STATUS.PAID:
      return INVOICE_STATUS.PAID;
    case PAYMENT_STATUS.EXPIRED:
      return INVOICE_STATUS.EXPIRED;
    case PAYMENT_STATUS.FAILED:
      return INVOICE_STATUS.FAILED;
    default:
      return INVOICE_STATUS.PENDING;
  }
}
