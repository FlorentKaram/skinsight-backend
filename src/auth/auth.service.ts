import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role, User } from '@prisma/client';
import { CreateUserDto } from 'src/app/users/dto/create-user.dto';
import { UsersService } from 'src/app/users/users.service';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDTO: CreateUserDto): Promise<User> {
    const userExists = await this.usersService.findByEmail(registerDTO.email);
    if (userExists) {
      throw new ConflictException('User already exists');
    }
    const user = await this.usersService.create(registerDTO);
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    return user;
  }

  async createAccessToken(userId: string) {
    return this.jwtService.sign(
      {
        sub: userId,
      },
      { expiresIn: '15m' },
    );
  }

  async createRefreshToken(userId: string) {
    return this.jwtService.sign(
      { sub: userId, tokenId: uuid() },
      { expiresIn: '7d' },
    );
  }

  async validateUser(payload: any): Promise<any> {
    return await this.usersService.findOne(payload.sub);
  }

  async decodeRefreshToken(token: string) {
    try {
      return await this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async replaceRefreshToken(userId: string, oldRefreshToken: string) {
    return this.createRefreshToken(userId);
  }
}
