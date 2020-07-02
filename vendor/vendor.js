'use strict';

require('dotenv').config();
const faker = require('faker');
const io = require('socket.io-client');
const socket = io.connect('http://localhost:3000/caps');



socket.emit('join', 'Happy Little Store');
socket.on('package-delivered', confirmDelivery);


function createOrder() {
  let storeName = process.env.STORE;
  let orderId = Math.ceil(Math.random() * 5000);
  let customerName = faker.name.findName();
  let customerAddress = faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.state}}, {{address.zipCode}}');
  let order = {store: storeName, orderId: orderId, customer: customerName, address: customerAddress};
  socket.emit('pickup', order);
  
}


function generateOrders() {

  //just creating two orders - could change this to create more - didn't want infinite loop
  let number = 0;
  while (number < 2){
    setTimeout(createOrder, 5000);
    number = number + 1;
  }
}

generateOrders();

function confirmDelivery(payload){
  console.log(`Thank you for delivering order ${payload.orderId}!`);
}

// events.on('package-delivered', (payload) => {
//   console.log(`Thank you for delivering order ${payload.orderId}!`)
// })


// module.exports = generateOrders;
