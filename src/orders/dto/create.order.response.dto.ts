import { Expose, Type } from 'class-transformer';
import { CheckoutOrderDto } from 'src/checkout/dto/checkout.dto';
import { InvoiceDto } from './invoice.dto';

export class CreateOrderResponseDto extends InvoiceDto {
  @Expose()
  @Type(() => CheckoutOrderDto)
  orders: CheckoutOrderDto[];
}
