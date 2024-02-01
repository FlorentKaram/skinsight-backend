import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'test@skinsight.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'test1234' })
  @IsNotEmpty()
  @Length(8, 20)
  @Transform(({ value }) => value.trim())
  password: string;
}
