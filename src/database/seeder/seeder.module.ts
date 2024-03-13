import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'src/security/encryption/encryption.service';

@Module({
  controllers: [SeederController],
  providers: [SeederService, PrismaService, EncryptionService],
})
export class SeederModule {}
