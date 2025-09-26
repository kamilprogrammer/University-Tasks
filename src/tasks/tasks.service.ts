import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  updateStatus(uuid: string, status: string) {
    return this.prisma.tasks.update({
      where: { id: uuid },
      data: { status },
    });
  }
}
