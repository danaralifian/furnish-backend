import { Expose } from 'class-transformer';
import { ToNumber } from 'src/common/helpers/transformers';

export class BaseDto {
  @Expose()
  id: number;

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
