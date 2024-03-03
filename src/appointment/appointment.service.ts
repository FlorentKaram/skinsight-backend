import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}

  async create(createAppointmentDto: CreateAppointmentDto) {
    const newAppointment = await this.prisma.appointment.create({
      data: createAppointmentDto,
    });
  }

  async findByPatient(id: string) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        patientId: id,
      },
    });

    if (!appointments) {
      throw new NotFoundException(
        `No appointments found for patient with id ${id}`,
      );
    }

    return appointments;
  }

  async findByDermatologist(id: string) {
    const appointments = await this.prisma.appointment.findMany({
      where: {
        dermatologistId: id,
      },
    });

    if (!appointments) {
      throw new NotFoundException(
        `No appointments found for dermatologist with id ${id}`,
      );
    }

    return appointments;
  }

  async findOne(id: string) {
    const appointment = await this.prisma.appointment.findUnique({
      where: {
        id: id,
      },
    });

    if (!appointment) {
      throw new NotFoundException(`No appointment found with id ${id}`);
    }

    return appointment;
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    const appointment = await this.prisma.appointment.update({
      where: {
        id: id,
      },
      data: updateAppointmentDto,
    });

    if (!appointment) {
      throw new NotFoundException(`No appointment found with id ${id}`);
    }

    return appointment;
  }

  async remove(id: string) {
    const appointment = await this.prisma.appointment.delete({
      where: {
        id: id,
      },
    });

    if (!appointment) {
      throw new NotFoundException(`No appointment found with id ${id}`);
    }

    return 'Appointment deleted';
  }
}
