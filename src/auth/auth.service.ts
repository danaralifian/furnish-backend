import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IResponse } from 'src/shared/interfaces/response';
import { formatResponse } from 'src/common/helpers/format-response';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<AuthDto>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<AuthDto> {
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new NotFoundException('Password does not match');
    }
    return user;
  }

  async signUp(auth: AuthDto): Promise<IResponse<AuthDto>> {
    const user: User = new User();
    const existingUser = await this.userRepository.findOneBy({
      email: auth.email,
    });
    if (existingUser) {
      throw new ConflictException('email already exists');
    }

    const hashedPassword = await bcrypt.hash(auth.password, 10);
    user.email = auth.email;
    user.username = auth.email.split('@')[0];
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return this.signIn(auth);
  }

  async signIn(auth: AuthDto): Promise<IResponse<AuthDto>> {
    const user = await this.validateUser(auth.email, auth.password);
    const payload = instanceToPlain(user);

    return formatResponse(
      {
        ...payload,
        accessToken: this.jwtService.sign(payload),
      },
      AuthDto,
    );
  }
}
