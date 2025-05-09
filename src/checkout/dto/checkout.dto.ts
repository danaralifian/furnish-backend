import { Expose, Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  Min,
  ValidateNested,
} from 'class-validator';

export class CheckoutItem {
  @Expose()
  @IsNotEmpty()
  productId: number;

  @Expose()
  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'Quantity must not be zero' })
  quantity: number;

  @Expose()
  name: string;

  @Expose()
  unitPrice: number;

  @Expose()
  total: number;
}

export class CheckoutOrderDto {
  @Expose()
  @IsNotEmpty()
  sellerId: number;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutItem) // Required for nested validation
  items: CheckoutItem[];

  @Expose()
  subtotal: number;

  @Expose()
  tax: number;

  @Expose()
  total: number;
}

export class CheckoutDto {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CheckoutOrderDto) // Required for nested validation
  orders: CheckoutOrderDto[];
}

export class CheckoutResponseDto extends CheckoutDto {
  @Expose()
  totalAmount: number;
}
