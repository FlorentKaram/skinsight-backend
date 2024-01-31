import { ApiProperty } from '@nestjs/swagger';

// User :  role        Role     @default(PATIENT)
//   sex         Sex
//   password    String
//   firstName   String
//   lastName    String
//   email       String   @unique
//   dateOfBirth DateTime
//   address     String
//   city        String
//   zipCode     String
//   secuNumber  String?
//   rppsNumber  String?

export class RegisterDto {}
