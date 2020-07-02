'use strict';

const socketIO = require('socket.io');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const io = socketIO(PORT);

io.on('connection', (socket) => {
  console.log('someone connected to the server');

  socket.on('error', (error) => console.log(error));
})

let caps = io.of('/caps');
caps.on('connection', (socket) => {
  console.log('someone connected to the caps namespace');
  
  socket.on('join', room => {
    console.log('someone joined room: ', room);
    socket.join(room);
  })

  socket.on('pickup', handlePickup);

  socket.on('in-transit', handleInTransit);

  socket.on('delivered', handleDelivered);
})

function handlePickup(payload) {
  let time = new Date();
  console.log({ event: 'Ready for Pickup', time, payload });
  caps.emit('ready-for-pickup', payload);
}

function handleInTransit(payload) {
  let time = new Date();
  console.log({ event: 'In-transit', time, payload });
  caps.to(payload.store).emit('package-in-transit', payload);
}

function handleDelivered(payload) {
  let time = new Date();
  console.log({ event: 'Delivered', time, payload });
  caps.to(payload.store).emit('package-delivered', payload);
}

// function handleData(buffer) {
//   let data = JSON.parse(buffer.toString());
//   if (data.event && data.payload) {
//     logger(data);
//     for (let socket in socketPool) {
//       socketPool[socket].write(JSON.stringify(data));
//     }
//   }
  

// }

// function logger(data) {
//   let time = new Date();
//   let event = data.event;
//   let payload = data.payload;
//   console.log({ event: event, time, payload });
// }


// module.exports = handleData;