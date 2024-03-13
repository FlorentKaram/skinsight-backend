import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({ example: '2021-10-10T10:00:00Z' })
  @IsNotEmpty()
  date: string;

  @ApiProperty()
  @IsNotEmpty()
  consultationId: string;

  @ApiProperty()
  @IsNotEmpty()
  patientId: string;

  @ApiProperty()
  @IsNotEmpty()
  dermatologistId: string;
}
