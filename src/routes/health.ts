import { Router } from 'express';

const router = Router();
router.get('/', (req, res) => {
  res.json('Spoke.ai is healthy');
});

export default router;
