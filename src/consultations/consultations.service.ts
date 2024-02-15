import { Injectable } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ConsultationsService {
  constructor(private prisma: PrismaService) {}

  create(createConsultationDto: CreateConsultationDto) {
    // encrypt files
    // create consultation
    const newConsultation = this.prisma.consultation.create({
      data: createConsultationDto,
    });

    return newConsultation;
  }

  findAll() {
    return this.prisma.consultation.findMany();
  }

  findOne(id: string) {
    return this.prisma.consultation.findUnique({
      where: { id },
    });
  }

  update(id: string, updateConsultationDto: UpdateConsultationDto) {
    return `This action updates a #${id} consultation`;
  }

  remove(id: string) {
    return this.prisma.consultation.delete({
      where: { id },
    });
  }
}
