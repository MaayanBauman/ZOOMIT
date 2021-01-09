import { Router } from 'express';
import { events } from '../controllers';

const router = Router();

router.get('/', events.getAllEvents);
router.get('/category/:category', events.getEventByCategory)
router.get('/:id', events.getEventById);
router.post('/', events.addEvent);
router.post('/:id/users/:user', events.addUserToEvents);
router.put('/:id', events.updateEvent);
router.delete('/:id', events.deleteEvent);

export default router;
