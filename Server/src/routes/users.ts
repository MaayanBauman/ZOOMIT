import { Router } from 'express';
import { users } from '../controllers';

const router = Router();

router.get('/', users.getAllUsers);
router.get('/:id', users.getUserById);
router.get('/types/:type', users.getUsersByType);
router.get('/email/:email', users.getUsersByEmail);
router.get('/:id/events', users.getUserEvents);
router.post('/', users.addUser);
router.put('/:id/events/:event', users.addEventToUser);
router.delete('/:id/events/:event', users.removeEventFromUser);
router.put('/:id', users.updateUser);
router.delete('/:id', users.deleteeUser);

export default router;
