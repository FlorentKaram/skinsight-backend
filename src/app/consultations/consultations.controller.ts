import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('consultations')
@ApiTags('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createConsultationDto: CreateConsultationDto) {
    return await this.consultationsService.create(createConsultationDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findAll() {
    return await this.consultationsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Param('id') id: string) {
    return await this.consultationsService.findOne(id);
  }

  @Get('patient/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findByPatient(@Param('id') id: string) {
    return await this.consultationsService.findByPatient(id);
  }

  @Get('generalist/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findByGeneralist(@Param('id') id: string) {
    return await this.consultationsService.findByGeneralist(id);
  }

  @Get('dermatologist/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findByDermatologist(@Param('id') id: string) {
    return await this.consultationsService.findByDermatologist(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return await this.consultationsService.update(id, updateConsultationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async remove(@Param('id') id: string) {
    return await this.consultationsService.remove(id);
  }
}
