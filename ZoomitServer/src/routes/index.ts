import { Router, Request, Response } from 'express';
import categories from './categories';
import events from './events';
import users from './users';
import sources from './sources';

const router = Router();

/* GET home page. */
router.get('/',(request: Request, response: Response) => {
    response.send('hello');
});

router.get('/emily', (request: Request, response: Response) => {
  response.send('emily');
});

router.use('/categories', categories);
router.use('/events', events);
router.use('/users', users);
router.use('/sources', sources)

export default router;
