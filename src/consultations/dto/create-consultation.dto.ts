import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultationDto {
  @ApiProperty({ example: 'Analyse de grain de beauté' })
  object: string;

  @ApiProperty({ example: 'Un exemple de description' })
  description: string;

  @ApiProperty({ example: 'false' })
  evolution: boolean;

  @ApiProperty({ example: '1' })
  patientId: string;
}
