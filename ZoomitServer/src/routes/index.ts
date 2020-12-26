import { Router, Request, Response } from 'express';

const router = Router();

/* GET home page. */
router.get('/',(request: Request, response: Response) => {
    response.send('hello');
});

router.get('/emily', (request: Request, response: Response) => {
  response.send('emily');
});

export default router;
