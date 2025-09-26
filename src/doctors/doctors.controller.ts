import { Controller, Get, Param } from '@nestjs/common';
import { DoctorsService } from './doctors.service';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Get(':uuid')
  getData(@Param('uuid') uuid: string) {
    return this.doctorsService.getData(uuid);
  }
}
