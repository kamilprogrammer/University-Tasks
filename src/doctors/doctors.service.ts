import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DoctorsService {
  constructor(private prisma: PrismaService) {}

  async getData(uuid: string) {
    try {
      return await this.prisma.doctors.findUnique({
        where: { id: uuid },
        include: {
          students: { include: { tasks: true } },
        },
      });
    } catch (err) {
      if (err.code === 'P1001') {
        console.warn('Lost DB connection, retrying...');
        await this.prisma.$disconnect();
        await this.prisma.$connect();
        return this.getData(uuid);
      }
      throw err;
    }
  }
  async getAllData() {
    try {
      const idk = await this.prisma.doctors.findMany({
        include: {
          students: { include: { tasks: true } },
        },
      });
      console.log('Idk: ', idk);
      return idk;
    } catch (err) {
      if (err.code === 'P1001') {
        console.warn('Lost DB connection, retrying...');
        await this.prisma.$disconnect();
        await this.prisma.$connect();
        return this.getAllData();
      }
      throw err;
    }
  }
}
