import { Expose, Type } from 'class-transformer';
import { InvoiceDto } from './invoice.dto';
import { OrderDto } from './order.dto';

export class InvoiceResponseDto extends InvoiceDto {
  @Expose()
  @Type(() => OrderDto)
  orders: OrderDto[];
}
