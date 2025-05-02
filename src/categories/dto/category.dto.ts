import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ToNumber } from 'src/common/helpers/transformers';

@Expose()
export class CategoryDto {
  id: number;

  @IsNotEmpty()
  name: string;

  description: string;

  image: string;

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
