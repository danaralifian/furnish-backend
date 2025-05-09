import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { BaseDto } from 'src/shared/dto/base.dto';

@Expose()
export class CategoryDto extends BaseDto {
  @IsNotEmpty()
  name: string;

  description: string;

  image: string;
}
