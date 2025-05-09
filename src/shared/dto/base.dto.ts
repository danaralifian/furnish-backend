import { Expose } from 'class-transformer';
import { ToNumber } from 'src/common/helpers/transformers';

export class BaseDto {
  @Expose()
  id: number;

  @Expose()
  @ToNumber()
  createdAt: number;

  @Expose()
  @ToNumber()
  updatedAt: number;

  @Expose()
  @ToNumber()
  deletedAt: number;
}
