import { Controller, Post, UseGuards } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('seeder')
@ApiTags('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async seedAll() {
    await this.seederService.seedUsers();
    await this.seederService.seedConsultations();
    await this.seederService.seedAppointments();

    return { message: 'Seeding done' };
  }

  @Post('users')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async seedUsers() {
    await this.seederService.seedUsers();
    return { message: 'Seeding users done' };
  }

  @Post('consultations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async seedConsultations() {
    await this.seederService.seedConsultations();
    return { message: 'Seeding consultations done' };
  }

  @Post('appointments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async seedAppointments() {
    await this.seederService.seedAppointments();
    return { message: 'Seeding appointments done' };
  }
}
