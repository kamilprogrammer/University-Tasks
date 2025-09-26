import { Controller, Patch, Param, Body, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Patch(':uuid/status/:status')
  updateStatus(@Param('uuid') uuid: string, @Param('status') status: string) {
    return this.tasksService.updateStatus(uuid, status);
  }

  @Post()
  addTask(
    @Body()
    task: {
      title: string;
      description: string;
      doctor_id: string;
      student_id: string;
    },
  ) {
    return this.tasksService.addTask(
      task.title,
      task.description,
      task.doctor_id,
      task.student_id,
    );
  }
}
