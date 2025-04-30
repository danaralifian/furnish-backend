import { Expose } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';

@Expose()
export class ProductDto {
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(3, { message: 'Description must have atleast 3 characters.' })
  description: string;

  @IsNotEmpty()
  images: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  stock: number;

  created_at: number;

  updated_at: number;

  deleted_at: number;
}
