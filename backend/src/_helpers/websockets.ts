import * as WebSocket from 'ws';
import * as http from 'http';
import { Application } from 'express';

export default (app: Application) => {
  // listen or serve server later
  const server = http.createServer(app)
  //initialize the WebSocket server instance
  const wss = new WebSocket.Server({ port: 4001 });
  wss.on('connection', (ws: WebSocket) => {
    // add user id here
    ws.on('message', (message: string) => {
      console.log('received: %s', message);
      ws.send(`Hello, you sent -> ${message}`);
    });
    ws.send('Hi there, I am a WebSocket server');
  });
}