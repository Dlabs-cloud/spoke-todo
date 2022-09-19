import { Router } from 'express';

import { create, edit, list, remove } from '../controllers/todo';

const router = Router();
router.get('/', list);
router.post('/', create);
router.patch('/:id', edit);
router.delete('/:id', remove);

export default router;
