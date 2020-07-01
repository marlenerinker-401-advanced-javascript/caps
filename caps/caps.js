'use strict';

const net = require('net');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const server = net.createServer();

const socketPool = {};


server.on('connection', (socket) => {
  const id = Math.floor(Math.random() * 10000000);
  socketPool[id] = socket;
  console.log('Connection established at ' + id);
  socket.on('data', handleData);
  socket.on('error', (error) => console.log(error));
  socket.on('end', () => { delete socketPool[id] });
})



server.on('error', (error => {
  console.log('SERVER ERROR found: ', error);
}))


function handleData(buffer) {
  let data = JSON.parse(buffer.toString());
  if (data.event && data.payload) {
    logger(data);
    for (let socket in socketPool) {
      socketPool[socket].write(JSON.stringify(data));
    }
  }

}

function logger(data) {
  let time = new Date();
  let event = data.event;
  let payload = data.payload;
  console.log({ event: event, time, payload });
}

//should listen for these, then log, then emit with same event and payload
// events.on('ready-for-pickup', (payload) => {
//   let time = new Date();
//   console.log({ event: 'Ready for Pickup', time, payload });
//   events.emit('package-ready', payload);
// });

// events.on('in-transit', (payload) => {
//   let time = new Date();
//   console.log({ event: 'In-transit', time, payload });
//   events.emit('package-in-transit', payload);
// });

// events.on('delivered', (payload) => {
//   let time = new Date();
//   console.log({ event: 'Delivered', time, payload });
//   events.emit('package-delivered', payload);
// });

server.listen(PORT, () => {
  console.log('Server is up on ' + PORT);
})

