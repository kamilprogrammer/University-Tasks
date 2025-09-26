import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { DoctorsModule } from './doctors/doctors.module';

@Module({
  imports: [PrismaModule, DoctorsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
