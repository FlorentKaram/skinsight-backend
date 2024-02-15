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

  @ApiProperty({
    example:
      'data:image/jpeg;base64,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',
  })
  @IsNotEmpty()
  file: string;

  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  patientId: string;
}
