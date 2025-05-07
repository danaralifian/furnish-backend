import { Expose } from 'class-transformer';
import { IsNotEmpty, MinLength, ValidateNested } from 'class-validator';
import { ToNumber } from 'src/common/helpers/transformers';

class ImageItemDto {
  @Expose()
  url: string;

  @Expose()
  alt: string;
}

export class ProductDto {
  @Expose()
  id: number;

  @Expose()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNotEmpty()
  @MinLength(3, { message: 'Description must have atleast 3 characters.' })
  description: string;

  @Expose()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  images: ImageItemDto[];

  @Expose()
  @IsNotEmpty()
  price: number;

  @Expose()
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
