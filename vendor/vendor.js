'use strict';

require('dotenv').config();
const faker = require('faker');

const net = require('net');
const Client = new net.Socket();

Client.connect(3000, 'localhost', () => {
  console.log('connected to server');
});

Client.on('data', checkEvent);

function checkEvent(buffer) {
  let data = JSON.parse(buffer.toString());
  if(data.event === 'package-delivered') {
    console.log(`Thank you for delivering order ${data.payload.orderId}!`);
  }
}

function createOrder() {
  let storeName = process.env.STORE;
  let orderId = Math.ceil(Math.random() * 5000);
  let customerName = faker.name.findName();
  let customerAddress = faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.state}}, {{address.zipCode}}');
  let order = {store: storeName, orderId: orderId, customer: customerName, address: customerAddress};
  Client.write(JSON.stringify({event: 'package-ready', payload: order}));
  
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



// events.on('package-delivered', (payload) => {
//   console.log(`Thank you for delivering order ${payload.orderId}!`)
// })


// module.exports = generateOrders;
