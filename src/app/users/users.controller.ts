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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ConsultationsService } from '../consultations/consultations.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly consultationsService: ConsultationsService,
  ) {}

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post('generalist/:id/getConsultation')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async newGeneralistConsultation(@Param('id') id: string) {
    return await this.consultationsService.newGeneralistConsultation(id);
  }

  @Post('dermatologist/:id/getConsultation')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async newDermatologistConsultation(@Param('id') id: string) {
    return await this.consultationsService.newDermatologistConsultation(id);
  }
}
