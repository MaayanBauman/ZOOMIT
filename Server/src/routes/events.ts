import { Router } from 'express';
import { events } from '../controllers';

const router = Router();

router.get('/', events.getAllEvents);
router.get('/category/:category', events.getEventByCategory)
router.get('/:id', events.getEventById);
router.get('/title/:title', events.getEventByTitle);
router.get('/users/:user', events.getEventsByUser);
router.post('/', events.addEvent);
router.put('/:id', events.updateEvent);
router.delete('/:id', events.deleteEvent);

export default router;
