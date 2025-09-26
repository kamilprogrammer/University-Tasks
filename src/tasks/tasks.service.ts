import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

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

  async addTask(
    title: string,
    description: string,
    doctor_id: string,
    student_id: string,
  ) {
    const task = await this.prisma.tasks.create({
      data: {
        id: uuidv4(),
        title,
        description,
        doctor_id,
        student_id,
        status: 'pending',
      },
    });
    await this.prisma.$disconnect();

    return task;
  }
}
