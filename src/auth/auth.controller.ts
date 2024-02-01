import { CreateUserDto } from './../users/dto/create-user.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: CreateUserDto, @Res() res: Response) {
    const user = await this.authService.register(registerDto);
    const accessToken = await this.authService.createAccessToken(
      registerDto.email,
    );
    const refreshToken = await this.authService.createRefreshToken(
      registerDto.email,
    );

    return res
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({
        access_token: accessToken,
        user: {
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      });
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Res() res: Response, @Body() loginDto: LoginDto) {
    const accessToken = await this.authService.createAccessToken(
      loginDto.email,
    );
    const refreshToken = await this.authService.createRefreshToken(
      loginDto.email,
    );

    const user = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    return res
      .cookie('refresh_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .json({
        access_token: accessToken,
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      });
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(@Res() res: Response, @Req() req: Request) {
    const oldRefreshToken = req.cookies['refresh_token'];
    const decodedToken =
      await this.authService.decodeRefreshToken(oldRefreshToken);

    const newRefreshToken = await this.authService.replaceRefreshToken(
      decodedToken.sub,
      decodedToken.tokenId,
    );
    const newAccessToken = await this.authService.createAccessToken(
      decodedToken.sub,
    );

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.send({ access_token: newAccessToken });
  }
}
