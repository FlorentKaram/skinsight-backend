import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
    @ApiProperty({ example: '2021-10-10T10:00:00Z' })
    date: string;

    @ApiProperty()
    consultationId: string;

    @ApiProperty()
    patientId: string;

    @ApiProperty()
    dermatologistId: string;
}