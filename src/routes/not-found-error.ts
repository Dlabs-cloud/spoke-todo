import { Router } from 'express';

const router = Router();

router.get('*', (req, res, next) => {
  return res.status(404).json('404 Not Found');
});

export default router;

'PGPASSWORD=1BkwzQqPFPKqRFuxJ6pKb5UYghE8bAir ' +
  'psql -h dpg-ccl2eben6mpoif95g8qg-a.frankfurt-postgres.render.com ' +
  '-U spoke_ai_user spoke_ai';
