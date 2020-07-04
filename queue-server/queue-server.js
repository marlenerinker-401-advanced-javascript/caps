'use strict';


const socketIO = require('socket.io');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const io = socketIO(PORT);


io.on('connection', (socket) => {
  console.log('someone connected to the server');

  socket.on('error', (error) => console.log(error));
})

//this will hold delivery event messages
let deliveryEventMessageQueue = [];

let queue = {
  greeting: {}
};


let caps = io.of('/caps');
caps.on('connection', (socket) => {
  console.log('someone connected to the caps namespace');
  
  socket.on('subscribe', handleSubscribed);

  socket.on('received', handleReceived);

  socket.on('getAll', handleGetAll);

  socket.on('delivered', handleDelivered);


})

//this function should allow someone to join a room and push the queue object into the message queue for the specified event type; it should check to see if the queue object already exists before pushing it into the message queue
function handleSubscribed(client) {
  let room = client.clientId;
  console.log('someone joined room: ', room);
    this.join(room);
    let check = checkQueue(deliveryEventMessageQueue, client);
    if (!check) {
      deliveryEventMessageQueue.push(client);
    }
    console.log(deliveryEventMessageQueue);
}

function handleReceived(payload) {
  deliveryEventMessageQueue.forEach(obj => {
    Object.keys(obj.messages).forEach(id => {
      if(id === payload.id) {
        delete obj.messages[id];
      }
    })
  })
}



function handleGetAll(payload) {
  deliveryEventMessageQueue.forEach(obj => {
    if(obj.clientId === payload.clientId){
      Object.keys(obj.messages).forEach(id => {
      caps.to(obj.clientId).emit('delivered', { id, message: obj.messages[id]});//obj.clientId is the room name
    })
  }
  })
}


function handleDelivered(payload) {
  let id = Math.floor(Math.random() * 100000000).toString();
    deliveryEventMessageQueue.forEach(obj => {
      if(obj.clientId === payload.retailer){
      obj.messages[id] = payload;      
      caps.to(obj.clientId).emit('delivered', { id, message: obj.messages[id]});
      }
    })
    console.log(deliveryEventMessageQueue);
}

function checkQueue(queue, object) {
  let testArray = Object.values(queue);
  let result = false;
  testArray.forEach(obj => {
    if(obj.clientId === object.clientId)
    return result = true;
  })
  return result;

}