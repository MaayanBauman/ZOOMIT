import express, { Request, Response, NextFunction, Express } from 'express';
import bodyParser from 'body-parser';
import http, { Server as httpServer } from 'http';
import { Server as socketServer, Socket } from 'socket.io';
import cors from 'cors';

import router from './routes';
import config from './config';
import UserType from './models/Enums/UserType';

require('dotenv').config();

const app: Express = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
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
    res.sendStatus(err.status).send(err.message);
  }

  res.sendStatus(500).send('Internal server error');
});

const server: httpServer = http.createServer(app);
const io = require("socket.io")(server);

let sockets: Socket[] = [];

io.on('connection', (socket: Socket) => {    
  if (socket.handshake.headers.origin === config.clientReactUrl) {
    sockets.push(socket);
    	socket.on('new-zoomer-request', (userId) => {
        	sockets.forEach((currSocket: Socket) => {
          		if (currSocket.handshake.query['user-type'] === UserType.ADMIN) {
            		currSocket.emit('new-zoomer-request', userId);
          		}
        	}) 
      	});   

		socket.on('disconnect', () => {
			sockets = sockets.filter((currSocket: Socket) => currSocket!== socket)
		});
  }   
}); 

server.listen(config.port, () => {
  console.log( `server started on port ${config.port}`);
});