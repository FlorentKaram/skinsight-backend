import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from 'src/database/prisma.service';
import { error } from 'console';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  async create(createConsultationDto: CreateConsultationDto) {
    // encrypt files

    const patient = await this.prisma.user.findUnique({
      where: { id: createConsultationDto.patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const consultation = await this.prisma.consultation.create({
      data: createConsultationDto,
    });

    if (!consultation) {
      throw new Error('Error creating consultation');
    }

    return 'Consultation created successfully';
  }

  async findAll() {
    return await this.prisma.consultation.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.consultation.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateConsultationDto: UpdateConsultationDto) {
    const consultation = await this.prisma.consultation.update({
      where: { id },
      data: updateConsultationDto,
    });

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    return 'Consultation updated successfully';
  }

  async remove(id: string) {
    const c = await this.prisma.consultation.delete({
      where: { id },
    });

    if (!c) {
      throw new NotFoundException('Consultation not found');
    }

    return 'Consultation deleted successfully';
  }
}
