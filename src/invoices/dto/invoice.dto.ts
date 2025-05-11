import { Expose, Type } from 'class-transformer';
import { PaymentDto } from 'src/payments/dto/payments.dto';
import { BaseDto } from 'src/shared/dto/base.dto';
import { INVOICE_STATUS } from 'src/shared/enum/invoice-status';
import { UserDto } from 'src/users/dto/user.dto';

export class InvoiceDto extends BaseDto {
  @Expose()
  status: INVOICE_STATUS;

  @Expose()
  invoiceId: string;

  @Expose()
  totalAmount: number;

  @Expose()
  userId: number;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => PaymentDto)
  payment: PaymentDto;
}
