import { Expose, Type } from 'class-transformer';
import { InvoiceDto } from './invoice.dto';
import { OrderDto } from '../../orders/dto/order.dto';

export class InvoiceResponseDto extends InvoiceDto {
  @Expose()
  @Type(() => OrderDto)
  orders: OrderDto[];
}
