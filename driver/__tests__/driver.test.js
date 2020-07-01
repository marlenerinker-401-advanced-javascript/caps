'use strict';

require('dotenv').config();
const checkEvent = require('../driver.js');



describe('testing driver', () => {
  
  it('should log when event is package-ready', (done) => {
    let buffer = JSON.stringify({store: 'Test Store', orderId: '1234', customer: 'Test Customer', address: '123 Main Street, AnyCity, AnyState, 12345'}) 
    checkEvent(buffer)
    .then(results => {
      console.log(results);
      done();
    })
    .catch(err => console.log(err));
    });
  });