import { Expose } from 'class-transformer';
import { IsNotEmpty, Min } from 'class-validator';
import { CheckoutDto } from 'src/checkout/dto/checkout.dto';

export class CreateOrderDto extends CheckoutDto {
  @Expose()
  @IsNotEmpty()
  @Min(1)
  shippingId: number;
}
