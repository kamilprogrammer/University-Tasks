import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DoctorsModule } from './doctors/doctors.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [PrismaModule, DoctorsModule, TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
