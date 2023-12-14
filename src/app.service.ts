import { Injectable } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async allUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
