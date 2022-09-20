import { IsEnum, IsString, MinLength, minLength, ValidateIf } from 'class-validator';

import { TodoStatus } from '../../datasource/entities/todo';

export class EditTodoDto {
  @ValidateIf((query) => query.name || !query.status?.length, {
    message: 'name should be provided if status is not provided',
  })
  @IsString({ message: 'todo name must be a string' })
  @MinLength(2, { message: 'name of the todo item should be provided' })
  name: string;

  @ValidateIf((query) => query.status || !query.name?.length, {
    message: 'status should be provided if name is not provided',
  })
  @IsEnum(TodoStatus, { message: 'status of the enum can only be IN_PROGRESS, COMPLETED' })
  status: TodoStatus;
}
