import { Router } from 'express';
import { categories } from '../controllers';

const router = Router();

router.get('/', categories.getAllCategories);
router.get('/:id', categories.getCategoryById);
router.post('/', categories.addCategory);
router.put('/:id', categories.updateCategory);
router.delete('/:id', categories.deleteCategory);

export default router;
