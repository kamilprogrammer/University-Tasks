import { Controller, Get, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { env } from 'process';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get(':uuid')
  getAllData(@Param('uuid') uuid: string) {
    if (uuid == env.ADMIN) {
      return this.doctorsService.getAllData();
    }
    return this.doctorsService.getData(uuid);
  }
}
