import { Router } from 'express';
import { events } from '../controllers';

const router = Router();

router.get('/', events.getAllEvents);
router.get('/join', events.getAllEventsJoined);
router.get('/category/:category', events.getEventByCategory);
router.get('/categories/count', events.getCountEventsByCategory);
router.get('/categories/price/sum', events.getSumEventsPriceByCategor);
router.get('/:id', events.getEventById);
router.get('/title/:title', events.getEventByTitle);
router.get('/users/:user', events.getEventsByUser);
router.post('/getByFilters', events.getEventsByFilters)
router.post('/getByFilters/join', events.getEventsByFiltersJoined)
router.post('/', events.addEvent);
router.post('/zoomer', events.addZoomerEvent);
router.put('/:id', events.updateEvent);
router.delete('/:id', events.deleteEvent);

export default router;
