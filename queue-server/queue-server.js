'use strict';


const socketIO = require('socket.io');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const io = socketIO(PORT);


io.on('connection', (socket) => {
  console.log('someone connected to the server');

  socket.on('error', (error) => console.log(error));
})

let messageQueue = [];
let clientNode = {
  clientId: null,
  event: {
    message: {}
  }
};
let queue = {
  greeting: {}
}

let caps = io.of('/caps');
caps.on('connection', (socket) => {
  console.log('someone connected to the caps namespace');
  
  socket.on('subscribe', handleSubscribed);

  socket.on('received', handleReceived);

  socket.on('getAll', handleGetAll);

  socket.on('delivered', handleDelivered);


})


function handleSubscribed(room) {
  console.log('someone joined room: ', room);
    this.join(room);
}

function handleReceived(payload) {
  delete queue.greeting[payload.id]
} 

function handleGetAll() {
  Object.keys(queue.greeting).forEach(id => {
    caps.emit('delivered', { id, payload: queue.greeting[id]});
  })
}

function handleDelivered(payload) {
  let id = Math.floor(Math.random() * 100000000);
    queue.greeting[id] = payload;
    console.log(queue);
    caps.emit('delivered', { id, payload });
}