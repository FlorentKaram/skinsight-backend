import { Controller, Post } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('seeder')
@ApiTags('seeder')
export class SeederController {
  constructor(private readonly seederService: SeederService) {}

  @Post('all')
  async seedAll() {
    await this.seederService.seedUsers();
    await this.seederService.seedConsultations();
    await this.seederService.seedAppointments();

    return { message: 'Seeding done' };
  }

  @Post('users')
  async seedUsers() {
    await this.seederService.seedUsers();
    return { message: 'Seeding users done' };
  }

  @Post('consultations')
  async seedConsultations() {
    await this.seederService.seedConsultations();
    return { message: 'Seeding consultations done' };
  }

  @Post('appointments')
  async seedAppointments() {
    await this.seederService.seedAppointments();
    return { message: 'Seeding appointments done' };
  }
}
