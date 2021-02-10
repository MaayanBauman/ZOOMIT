import { Router } from 'express';
import { scrapers } from '../controllers';

const router = Router();

router.get('/', scrapers.getMoreEvents);

export default router;