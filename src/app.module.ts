import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './database/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './app/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ConsultationsModule } from './app/consultations/consultations.module';
import { EncryptionModule } from './security/encryption/encryption.module';
import { AppointmentModule } from './app/appointment/appointment.module';
import { SeederModule } from './database/seeder/seeder.module';

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
