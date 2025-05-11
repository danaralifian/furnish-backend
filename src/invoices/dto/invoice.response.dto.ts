import { Expose, Type } from 'class-transformer';
import { InvoiceDto } from './invoice.dto';
import { OrderDto } from '../../orders/dto/order.dto';
import { PaymentDto } from 'src/payments/dto/payments.dto';

export class InvoiceResponseDto extends InvoiceDto {
  @Expose()
  @Type(() => OrderDto)
  orders: OrderDto[];

  @Expose()
  @Type(() => PaymentDto)
  payment: PaymentDto;
}
