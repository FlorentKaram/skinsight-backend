import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { Status } from '@prisma/client';

@Injectable()
export class ConsultationsService {
  constructor(
    private prisma: PrismaService,
    private encrypte: EncryptionService,
  ) {}

  async create(createConsultationDto: CreateConsultationDto) {
    const patient = await this.prisma.user.findUnique({
      where: { id: createConsultationDto.patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }
  
    // encrypt all fields in createConsultationDto except patientId
    const encryptedConsultation = this.encrypte.encryptObject(
      {
        ...createConsultationDto,
        status: Status.PENDING,
      }
    );
    

    const consultation = await this.prisma.consultation.create({
      data: encryptedConsultation,
    });

    if (!consultation) {
      throw new Error('Error creating consultation');
    }

    return 'Consultation created successfully';
  }

  async findAll() {
    const consultations = await this.prisma.consultation.findMany();
    return consultations.map((c) => this.encrypte.decryptObject(c));
  }

  async findOne(id: string) {
    const consultation = await this.prisma.consultation.findUnique({
      where: { id },
    });

    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    return this.encrypte.decryptObject(consultation, ['id', 'patientId']);
  }

  async update(id: string, updateConsultationDto: UpdateConsultationDto) {
    const patient = await this.prisma.user.findUnique({
      where: { id: updateConsultationDto.patientId },
    });

    if (!patient) {
      throw new NotFoundException('Patient not found');
    }

    const encryptedConsultation = this.encrypte.encryptObject(
      updateConsultationDto,
      ['id', 'patientId'],
    );
    const consultation = await this.prisma.consultation.update({
      where: { id },
      data: encryptedConsultation,
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
