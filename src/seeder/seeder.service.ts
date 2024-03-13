import { Injectable } from '@nestjs/common';
import { Appointment, Role, Sex } from '@prisma/client';
import { EncryptionService } from 'src/encryption/encryption.service';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SeederService {
  private roundsOfHash = 10;

  constructor(
    private readonly encrypt: EncryptionService,
    private readonly prisma: PrismaService,
  ) {}

  async seedUsers() {
    const patientPwd = await bcrypt.hash('patient', this.roundsOfHash);
    const generalistPwd = await bcrypt.hash('generalist', this.roundsOfHash);
    const dermatoPwd = await bcrypt.hash('dermato', this.roundsOfHash);

    const users = [
      {
        email: 'patient@skinsight.com',
        firstName: 'John',
        lastName: 'Wick',
        password: patientPwd,
        role: Role.PATIENT,
        sex: Sex.MALE,
        dateOfBirth: new Date(0),
        address: '2 place de la madeleine',
        city: 'Toulouse',
        zipCode: '31000',
      },
      {
        email: 'generalist@skinsight.com',
        firstName: 'General',
        lastName: 'List',
        password: generalistPwd,
        role: Role.GENERALIST,
        sex: Sex.MALE,
        dateOfBirth: new Date(0),
        address: '2 place de la paix',
        city: 'Toulouse',
        zipCode: '31000',
      },
      {
        email: 'dermato@skinsight.com',
        firstName: 'Dermato',
        lastName: 'Logist',
        password: dermatoPwd,
        role: Role.DERMATOLOGIST,
        sex: Sex.FEMALE,
        dateOfBirth: new Date(0),
        address: '2 place de la madeleine',
        city: 'Toulouse',
        zipCode: '31000',
      },
    ];

    for (const user of users) {
      await this.prisma.user.upsert({
        where: { email: user.email },
        update: {
          password: user.password,
        },
        create: this.encrypt.encryptObject(user, [
          'id',
          'password',
          'role',
          'sex',
          'dateOfBirth',
        ]),
      });
    }
  }

  async seedConsultations() {
    const patient = await this.prisma.user.findUnique({
      where: { email: 'patient@skinsight.com' },
    });

    const generalist = await this.prisma.user.findUnique({
      where: { email: 'generalist@skinsight.com' },
    });

    const dermatologist = await this.prisma.user.findUnique({
      where: { email: 'dermato@skinsight.com' },
    });

    if (!patient || !generalist || !dermatologist) {
      throw new Error('Users are not seeded yet');
    }

    const consultations = [
      {
        generalistId: generalist?.id,
        patientId: patient?.id,
        object: 'Tache pigmentaire suspecte',
        description: 'Tache pigmentaire suspecte sur le dos',
        evolution: true,
        files: [
          '150bd674376433a574c8b19c97b58386:bc7092bcee',
          'b44bc4125dc819b67d1cc79f72e6296d:eee250cd24',
        ],
      },
      {
        patientId: patient?.id,
        object: 'Bouton suspect',
        description: 'Bouton suspect sur le bras',
        evolution: false,
        files: [
          '150bd674376433a574c8b19c97b58386:bc7092bcee',
          'b44bc4125dc819b67d1cc79f72e6296d:eee250cd24',
        ],
      },
      {
        patientId: patient?.id,
        object: 'Tache pigmentaire suspecte',
        description: 'Tache pigmentaire suspecte sur le dos',
        evolution: true,
        files: [
          '150bd674376433a574c8b19c97b58386:bc7092bcee',
          'b44bc4125dc819b67d1cc79f72e6296d:eee250cd24',
        ],
      },
      {
        patientId: patient?.id,
        object: 'Grain de beauté particulier',
        description: 'Grain de beauté particulier sur le bras',
        evolution: true,
        files: [
          '150bd674376433a574c8b19c97b58386:bc7092bcee',
          'b44bc4125dc819b67d1cc79f72e6296d:eee250cd24',
        ],
      },
      {
        dermatologistId: dermatologist?.id,
        generalistId: generalist?.id,
        patientId: patient?.id,
        object: 'Grain de beauté douloureux',
        description: 'Grain de beauté douloureux sur le dos',
        evolution: true,
        status: 'ANALYZED',
        advice:
          'Le grain de beauté est suspect, il faut probablement le retirer',
        files: [
          '150bd674376433a574c8b19c97b58386:bc7092bcee',
          'b44bc4125dc819b67d1cc79f72e6296d:eee250cd24',
        ],
      },
    ];

    for (const consultation of consultations) {
      const encryptedConsultation = this.encrypt.encryptObject(consultation, [
        'evolution',
        'status',
        'files',
      ]);
      await this.prisma.consultation.create({ data: encryptedConsultation });
    }
  }

  async seedAppointments() {
    const patient = await this.prisma.user.findUnique({
      where: { email: 'patient@skinsight.com' },
    });

    const dermatologist = await this.prisma.user.findUnique({
      where: { email: 'dermato@skinsight.com' },
    });

    const consultations = await (
      await this.prisma.consultation.findMany()
    ).map(
      (consultation) => consultation.id,
    );

    if (consultations.length >= 5 && patient && dermatologist) {
      const appointments = [
        {
          dermatologistId: dermatologist?.id,
          patientId: patient?.id,
          date: new Date(2023, 11, 1, 14, 0, 0),
          consultationId: consultations[0],
        },
        {
          dermatologistId: dermatologist?.id,
          patientId: patient?.id,
          date: new Date(2023, 11, 15, 14, 0, 0),
          consultationId: consultations[1],
        },
        {
          dermatologistId: dermatologist?.id,
          patientId: patient?.id,
          date: new Date(2023, 11, 29, 14, 0, 0),
          consultationId: consultations[2],
        },
      ];

      for (const appointment of appointments) {
          await this.prisma.appointment.upsert({
            where: { consultationId: appointment.consultationId },
            update: {},
            create: this.encrypt.encryptObject(appointment, ['date']),
          });
      }
    } else {
      throw new Error('Consultations are not seeded yet');
    }
  }
}
