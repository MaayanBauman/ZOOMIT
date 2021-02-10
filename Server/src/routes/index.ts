import { Router, Request, Response } from 'express';
import categories from './categories';
import events from './events';
import users from './users';
import sources from './sources';
import scrapers from './scrapers';

const router = Router();

router.use('/categories', categories);
router.use('/events', events);
router.use('/users', users);
router.use('/sources', sources);
router.use('/scrapers', scrapers);

export default router;
