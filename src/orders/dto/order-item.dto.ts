import { Expose, Type } from 'class-transformer';
import { ProductDto } from 'src/products/dto/product.dto';
import { BaseDto } from 'src/shared/dto/base.dto';

export class OrderItemDto extends BaseDto {
  @Expose({ name: 'product_id' })
  productId: number;

  @Expose()
  orderId: number;

  @Expose()
  quantity: number;

  @Expose()
  price: number;

  @Expose()
  total: number;

  @Expose()
  @Type(() => ProductDto)
  product: ProductDto;
}
