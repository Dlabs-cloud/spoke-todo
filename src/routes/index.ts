import { Router } from 'express';

import health from './health';
import notFoundErrorPage from './not-found-error';
import notFoundError from './not-found-error';
import todoList from './todo-list';

const router = Router();
router.use('/todos', todoList);
router.use('/health', health);
router.use(notFoundError);
export default router;
