import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async updateStatus(uuid: string, status: string) {
    const task = this.prisma.tasks.update({
      where: { id: uuid },
      data: { status },
    });
    await this.prisma.$disconnect();

    return task;
  }
}
