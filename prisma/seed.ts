import { PrismaClient, Role, Sex } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const roundsOfHash = 10;

async function main() {
  const adminPassword = await bcrypt.hash('generalist', roundsOfHash);
  const testPassword = await bcrypt.hash('test1234', roundsOfHash);

  const user = await prisma.user.upsert({
    where: { email: 'generalist@skinsight.com' },
    update: {
      password: adminPassword,
    },
    create: {
      email: 'generalist@skinsight.com',
      firstName: 'General',
      lastName: 'List',
      password: adminPassword,
      role: Role.GENERALIST,
      sex: Sex.MALE,
      dateOfBirth: new Date(0),
      address: '2 place de la paix',
      city: 'Toulouse',
      zipCode: '31000',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'test@skinsight.com' },
    update: {
      password: testPassword,
    },
    create: {
      email: 'test@skinsight.com',
      firstName: 'John',
      lastName: 'Wick',
      password: testPassword,
      role: Role.PATIENT,
      sex: Sex.MALE,
      dateOfBirth: new Date(0),
      address: '2 place de la madeleine',
      city: 'Toulouse',
      zipCode: '31000',
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
