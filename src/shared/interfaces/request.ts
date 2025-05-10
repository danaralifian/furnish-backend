import { UserDto } from 'src/users/dto/user.dto';

export interface IRequest extends Express.Request {
  user: UserDto;
}
