'use strict';

const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');


socket.on('ready-for-pickup', handlePickup);



function handlePickup(payload) {
  setTimeout(function(){
  console.log(`DRIVER: picked up ${payload.orderId}`);
  socket.emit('in-transit', payload);
  }, 1000)
  setTimeout(function(){
    socket.emit('delivered', payload);
  }, 3000)
  
}


