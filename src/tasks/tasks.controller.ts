import { Controller, Patch, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Patch(':uuid/status/:status')
  updateStatus(@Param('uuid') uuid: string, @Param('status') status: string) {
    return this.tasksService.updateStatus(uuid, status);
  }
}
