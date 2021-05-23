import { Router } from 'express';
import { users } from '../controllers';

const router = Router();

router.get('/', users.getAllUsers);
router.get('/:id', users.getUserById);
router.get('/types/:type', users.getUsersByType);
router.get('/email/:email', users.getUsersByEmail);
router.get('/:id/events', users.getUserEvents);
router.get('/:id/events/join', users.getUserEventsJoined);
router.get('/zoomer/:id/events', users.getZoomerEvents);
router.post('/', users.addUser);
router.put('/:id/events/:eventid', users.addEventToUser);
router.delete('/:id/events/:eventid', users.removeEventFromUser);
router.put('/:id/event/:eventid/rating', users.updateEventFromUser);
router.put('/:id', users.updateUser);
router.delete('/:id', users.deleteUser);
router.get('/zoomer/requesters', users.getAllZoomerRequesters);

export default router;
