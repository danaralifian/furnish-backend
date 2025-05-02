import { Expose } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ToNumber } from 'src/common/helpers/transformers';

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

  @Expose({ name: 'created_at' })
  @ToNumber()
  createdAt: number;

  @Expose({ name: 'updated_at' })
  @ToNumber()
  updatedAt: number;

  @Expose({ name: 'deleted_at' })
  @ToNumber()
  deletedAt: number;
}
