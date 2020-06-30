'use strict';

require('dotenv').config();
const events = require('./events.js');
const faker = require('faker');
require('../caps.js');




function createOrder() {
  let storeName = 'Happy Little Store'; //process.env.STORE
  let orderId = Math.ceil(Math.random() * 5000);
  let customerName = faker.name.findName();
  let customerAddress = faker.fake('{{address.streetAddress}}, {{address.city}}, {{address.state}}, {{address.zipCode}}');
  let order = {store: storeName, orderId: orderId, customer: customerName, address: customerAddress};
  events.emit('ready-for-pickup', order);
  
}


function generateOrders() {

  //just creating two orders - could change this to create more - didn't want infinite loop
  let number = 0;
  while (number < 2){
    setTimeout(createOrder, 5000);
    number = number + 1;
  }

  // let orders = setInterval(createOrder, 5000);
  // clearInterval(orders);

}

events.on('package-delivered', (payload) => {
  console.log(`Thank you for delivering order ${payload.orderId}!`)
})


module.exports = generateOrders;
