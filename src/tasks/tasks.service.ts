import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async updateStatus(uuid: string, status: string) {
    const task = await this.prisma.tasks.update({
      where: { id: uuid },
      data: { status },
    });
    await this.prisma.$disconnect();

    return task;
  }

  async addTask(title: string, description: string, student_id: string) {
    const task = await this.prisma.tasks.create({
      data: {
        title,
        description,
        student_id,
        status: 'pending',
      },
    });
    await this.prisma.$disconnect();

    return task;
  }
}
