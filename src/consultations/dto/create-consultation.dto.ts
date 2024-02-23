import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateConsultationDto {
  @ApiProperty({ example: 'Analyse de grain de beauté' })
  @IsNotEmpty()
  object: string;

  @ApiProperty({ example: 'Un exemple de description' })
  @IsOptional()
  description: string;

  @ApiProperty({ example: 'false' })
  @IsNotEmpty()
  @IsBoolean()
  evolution: boolean;

  @ApiProperty({ example: '["file1", "file2"]' })
  @IsNotEmpty()
  files: string[];

  @ApiProperty({ example: 'id' })
  @IsNotEmpty()
  patientId: string;
}
