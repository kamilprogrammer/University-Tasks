import { Controller, Get, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get(':uuid')
  getAllData(@Param('uuid') uuid: string) {
    if (uuid == '1a6ca25e-4f41-4d19-9e7e-0acab5cfa1b1') {
      return this.doctorsService.getAllData();
    }
    return this.doctorsService.getData(uuid);
  }
}
