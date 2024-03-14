import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultationDto } from './create-consultation.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateConsultationDto extends PartialType(CreateConsultationDto) {
  @ApiProperty({ example: '["file1", "file2"]' })
  @IsOptional()
  files: string[];

  @ApiProperty({ example: 'ANALYZED' })
  @IsOptional()
  status: string;

  @ApiProperty({ example: 'Grain de beauté à surveiller' })
  @IsOptional()
  advice: string;

  @ApiProperty({ example: 'LOW' })
  @IsOptional()
  criticality: string;
}
