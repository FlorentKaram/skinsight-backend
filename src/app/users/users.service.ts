import { Role, User } from '@prisma/client';
import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { EncryptionService } from 'src/security/encryption/encryption.service';

export const roundsOfHash = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private encrypt: EncryptionService) {}

  async create(createUserDto: CreateUserDto): Promise<User>{
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      roundsOfHash,
    );

    if (createUserDto.role === Role.DERMATOLOGIST || createUserDto.role === Role.GENERALIST && !createUserDto.rppsNumber) {
      throw new NotAcceptableException('RPPS number is required for dermatologist and generalist');
    } else if (createUserDto.role === Role.PATIENT && !createUserDto.secuNumber) {
      throw new NotAcceptableException('Secu number is required for patient');
    }

    const newUser = await this.prisma.user.create({ data: this.encrypt.encryptObject(createUserDto) });
    return this.encrypt.decryptObject(newUser);


  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    
    // omit password and timestamp fields
    const sanitizedUsers = users.map((user) => {
      const { password, ...sanitizedUser } = user;
      return sanitizedUser
    });

    return sanitizedUsers.map((user) => this.encrypt.decryptObject(user));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { password, ...sanitizedUser } = user;

    return this.encrypt.decryptObject(sanitizedUser);
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.encrypt.decryptObject(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHash,
      );
    }

    const user = this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return this.encrypt.decryptObject(user);
  }

  remove(id: string) {
    const removeUser = this.prisma.user.delete({
      where: { id },
    });

    if (!removeUser) {
      throw new NotFoundException('User not found');
    }

    return "deleted successfully";
  }
}
