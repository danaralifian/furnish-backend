import { Expose, Type } from 'class-transformer';
import { BaseDto } from 'src/shared/dto/base.dto';
import { ORDER_STATUS } from 'src/shared/enum/order-status';
import { UserDto } from 'src/users/dto/user.dto';
import { OrderItemDto } from './order-item.dto';
import { InvoiceDto } from 'src/invoices/dto/invoice.dto';

export class OrderDto extends BaseDto {
  @Expose()
  userId: number;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  orderId: string;

  @Expose()
  sellerId: number;

  @Expose()
  status: ORDER_STATUS;

  @Expose()
  subTotal: number;

  @Expose()
  tax: number;

  @Expose()
  total: number;

  @Expose()
  invoiceId: number;

  @Expose()
  @Type(() => OrderItemDto)
  items: OrderItemDto[];

  @Expose()
  @Type(() => InvoiceDto)
  invoice: InvoiceDto;
}
