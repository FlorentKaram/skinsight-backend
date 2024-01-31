import { PrismaClient, Role, Sex } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@skinsight.com' },
    update: {},
    create: {
      email: 'admin@skinsight.com',
      firstName: 'admin',
      lastName: 'admin',
      password: 'admin',
      role: Role.ADMIN,
      sex: Sex.MALE,
      dateOfBirth: new Date(0),
      address: '2 place de la paix',
      city: 'Toulouse',
      zipCode: '31000',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'test@skinsight.com' },
    update: {},
    create: {
      email: 'test@skinsight.com',
      firstName: 'John',
      lastName: 'Wick',
      password: 'test',
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
