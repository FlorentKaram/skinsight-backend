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
    return `This action returns all consultations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consultation`;
  }

  update(id: number, updateConsultationDto: UpdateConsultationDto) {
    return `This action updates a #${id} consultation`;
  }

  remove(id: number) {
    return `This action removes a #${id} consultation`;
  }
}
