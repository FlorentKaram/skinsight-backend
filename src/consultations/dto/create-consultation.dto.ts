import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';

/*
 id          String   @id @unique @default(uuid())
  status      Status   @default(PENDING)
  object      String
  description String
  evolution   Boolean  @default(false)
  advice      String?
  key         String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relationships
  patientId String
  patient   User       @relation(fields: [patientId], references: [id])
  document  Document[]
  analysis  Analysis[]
*/

export class CreateConsultationDto {
  @ApiProperty({ example: 'Analyse de grain de beauté' })
  object: string;

  @ApiProperty({ example: 'Un exemple de description' })
  description: string;

  @ApiProperty({ example: 'false' })
  evolution: boolean;

  @ApiProperty({ example: '1' })
  patientId: string;

  @ApiProperty()
  document: string;
}
