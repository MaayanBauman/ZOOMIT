import express, { Request, Response, NextFunction, Express } from 'express';
import bodyParser from 'body-parser';
import router from './routes';
import config from './config';

require('dotenv').config();

const app: Express = express();

app.use(bodyParser.json());
app.use('/', router);

app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(404).send('<h1>404- Page not foung</h1>');
  } catch (err) {
    next(err);
  }
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  if (err.status) {
    res.status(err.status).send(err.message);
  }

  res.send(500).send('Internal server error');
});

app.listen(config.port, () => {
  console.log( `server started on port ${config.port}`);
});
