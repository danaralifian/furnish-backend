import { Expose, Type } from 'class-transformer';
import { UserDto } from 'src/users/dto/user.dto';

export class OrderDto {
  @Expose()
  id: number;

  @Expose({ name: 'user_id' })
  userId: number;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;
}
