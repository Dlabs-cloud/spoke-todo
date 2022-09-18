import { Router } from 'express';

import health from './health';
import todoList from './todo-list';

const router = Router();
router.use('/todos', todoList);
router.use('/health', health);
export default router;
