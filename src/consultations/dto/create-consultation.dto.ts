import { ApiProperty } from '@nestjs/swagger';
import { IsBase64, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

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

  @ApiProperty({ example: 'data:image/png;base64,iVBORw0...' })
  @IsNotEmpty()
  file: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  patientId: string;
}
