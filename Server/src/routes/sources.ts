import { Router } from 'express';
import { sources } from '../controllers';

const router = Router();

router.get('/', sources.getAllSources);
router.get('/:id', sources.getSourceById);
router.post('/', sources.addSource);
router.put('/:id', sources.updateSource);
router.delete('/:id', sources.deleteSource);

export default router;
