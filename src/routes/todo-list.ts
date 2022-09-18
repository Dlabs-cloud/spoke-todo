import { Router } from 'express';

import { create, list } from '../controllers/todo';

const router = Router();
router.get('/', list);
router.post('/', create);

export default router;
