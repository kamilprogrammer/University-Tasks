import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async getData(uuid: string) {
    const doctor = await this.prisma.doctors.findUnique({
      where: { id: uuid },
      include: {
        doctor_students: {
          include: { students: { include: { tasks: true } } },
          omit: { doctor_id: true, student_id: true },
        },
      },
    });
    await this.prisma.$disconnect();

    return doctor;
  }
}
