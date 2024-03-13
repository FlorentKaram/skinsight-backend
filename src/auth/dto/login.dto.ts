import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'patient@skinsight.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'patient!' })
  @IsNotEmpty()
  @Length(8, 20)
  @Transform(({ value }) => value.trim())
  password: string;
}
