import { Router } from 'express';
import { users } from '../controllers';

const router = Router();

router.get('/', users.getAllUsers);
router.get('/:id', users.getUserById);
router.post('/', users.addUser);
router.post('/:id/events/:event', users.addUserToEvents);
router.put('/:id', users.updateUser);
router.delete('/:id', users.deleteeUser);

export default router;
