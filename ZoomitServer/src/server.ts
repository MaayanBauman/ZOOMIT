import express from 'express';
import bodyParser from 'body-parser';

import router from './routes';
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log( `server started on port ${process.env.PORT}`);
});
