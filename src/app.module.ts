import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ConsultationsModule } from './consultations/consultations.module';
import { EncryptionModule } from './encryption/encryption.module';
import { AppointmentModule } from './appointment/appointment.module';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ConsultationsModule,
    EncryptionModule,
    AppointmentModule,
    SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
