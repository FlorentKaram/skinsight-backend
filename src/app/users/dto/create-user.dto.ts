import { ApiProperty } from '@nestjs/swagger';
import { Role, Sex } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsDate,
  IsPostalCode,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ enum: Role, default: Role.PATIENT, example: Role.PATIENT })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({ enum: Sex, default: Sex.MALE, example: Sex.MALE })
  @IsEnum(Sex)
  sex: Sex;

  @ApiProperty({ example: 'password123' })
  @IsNotEmpty()
  @Length(8, 20)
  @Transform(({ value }) => value.trim())
  password: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1990-01-01' })
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  dateOfBirth: Date;

  @ApiProperty({ example: '123 Main St' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ example: 'Paris' })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({ example: '75000' })
  @IsNotEmpty()
  @IsPostalCode('FR')
  zipCode: string;

  @ApiProperty({ required: false, example: '1234567890123' })
  @IsOptional()
  @IsString()
  secuNumber?: string;

  @ApiProperty({ required: false, example: '1234567890123' })
  @IsOptional()
  @IsString()
  rppsNumber?: string;
}
