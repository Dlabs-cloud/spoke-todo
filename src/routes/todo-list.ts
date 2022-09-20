import { validate } from 'class-validator';
import { Router } from 'express';

import { create, edit, find, list, remove } from '../controllers/todo';
import { Todo } from '../datasource/entities/todo';
import { validates } from '../middleware/validator.middleware';
import { CreateTodoDto } from '../validators/todo/create-todo.dto';
import { EditTodoDto } from '../validators/todo/edit-todo.dto';

const router = Router();
router.get('/', list);
router.get('/:id([0-9]+)', find);
router.post('/', validates(CreateTodoDto), create);
router.patch('/:id([0-9]+)', validates(EditTodoDto), edit);
router.delete('/:id([0-9]+)', remove);

export default router;
