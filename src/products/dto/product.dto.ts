import { Expose } from 'class-transformer';
import { IsNotEmpty, MinLength, ValidateNested } from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

class ImageItemDto {
  @Expose()
  url: string;

  @Expose()
  alt: string;
}

export class ProductDto extends BaseDto {
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
}
