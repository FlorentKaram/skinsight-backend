import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { EncryptionService } from 'src/security/encryption/encryption.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, EncryptionService],
  exports: [UsersService],
})
export class UsersModule {}
