import { Module } from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { ConsultationsController } from './consultations.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'src/security/encryption/encryption.service';

@Module({
  controllers: [ConsultationsController],
  providers: [ConsultationsService, PrismaService, EncryptionService],
})
export class ConsultationsModule {}
