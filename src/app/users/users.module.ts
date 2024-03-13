import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'src/security/encryption/encryption.service';
import { ConsultationsService } from '../consultations/consultations.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, EncryptionService, ConsultationsService],
  exports: [UsersService],
})
export class UsersModule {}
