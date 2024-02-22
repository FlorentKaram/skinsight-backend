import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConsultationsService } from './consultations.service';
import { CreateConsultationDto } from './dto/create-consultation.dto';
import { UpdateConsultationDto } from './dto/update-consultation.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('consultations')
@ApiTags('consultations')
export class ConsultationsController {
  constructor(private readonly consultationsService: ConsultationsService) {}

  @Post()
  async create(@Body() createConsultationDto: CreateConsultationDto) {
    return await this.consultationsService.create(createConsultationDto);
  }

  @Get()
  async findAll() {
    return await this.consultationsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.consultationsService.findOne(id);
  }

  @Get('patient/:id')
  async findByPatient(@Param('id') id: string) {
    return await this.consultationsService.findByPatient(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateConsultationDto: UpdateConsultationDto,
  ) {
    return await this.consultationsService.update(id, updateConsultationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.consultationsService.remove(id);
  }
}
