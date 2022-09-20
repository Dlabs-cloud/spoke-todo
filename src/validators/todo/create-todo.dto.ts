import { IsEnum, IsOptional, IsString, MIN, MinLength } from 'class-validator';

import { TodoStatus } from '../../datasource/entities/todo';

export class CreateTodoDto {
  @IsString({ message: 'name can only be a string' })
  @MinLength(2, { message: 'Min length of todo cannot be less than one' })
  name: string;

  @IsOptional()
  @IsEnum(TodoStatus, { message: 'status of the enum can only be IN_PROGRESS, COMPLETED' })
  status: TodoStatus;
}
