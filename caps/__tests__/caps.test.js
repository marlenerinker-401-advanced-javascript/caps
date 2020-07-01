'use strict';

const startOrders = require('../lib/vendor.js');
const events = require('../../lib/events.js');


require('dotenv').config();


require('../lib/driver.js');
require('../lib/vendor.js');
require('../caps.js');

//need to add tests

// describe('testing ordering system', () => {

//   it('should log when order is placed', (done) => {
//     startOrders()
//     .then(results => {
//       setTimeout(console.log(results), 10000)
//       done();
//     })
//     .catch(err => console.log(err));
//     });
//   });