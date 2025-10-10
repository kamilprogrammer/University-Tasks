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
          students: { include: { doctor: {select: {domain: true}}, tasks: true} },
        },
      });
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
  async getAllDomains() {
    try {
      const idk = await this.prisma.doctors.findMany({
        select: { domain: true, students: {include: {tasks: true}} },
      });
      
      const domainAcheivements = [...new Map(idk.map(domain => [domain.domain, {
        domain: domain.domain,
        acheivement: (idk
          .filter(d => d.domain === domain.domain)
          .flatMap(d => d.students)
          .flatMap(s => s.tasks)
          .filter(t => t.status === 'done').length /
          idk
            .filter(d => d.domain === domain.domain)            
            .flatMap(d => d.students)
            .flatMap(s => s.tasks).length) *
          100
      }])).values()].filter(domain => domain.domain !== null);

      console.log("IDK.. ", domainAcheivements)
      return  domainAcheivements;
    } catch (err) {
      if (err.code === 'P1001') {
        console.warn('Lost DB connection, retrying...');
        await this.prisma.$disconnect();
        await this.prisma.$connect();
        return this.getAllDomains();
      }
      throw err;
    }
  }

}
