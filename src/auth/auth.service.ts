import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async register(registerDTO: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) {
  //   // const userExists = this.usersService.findOne();
  //   // if (userExists) {
  //   //   throw new UnauthorizedException('Email is already taken');
  //   // }
  //   const user = await this.usersService.create(registerDTO);
  //   return 'user';
  // }

  async login(email: string, password: string) {
    const user = await this.usersService.findOne(email);
    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
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

  decodeRefreshToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async replaceRefreshToken(userId: string, oldRefreshToken: string) {
    return this.createRefreshToken(userId);
  }
}
