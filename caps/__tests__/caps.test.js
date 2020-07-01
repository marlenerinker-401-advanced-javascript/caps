'use strict';



require('dotenv').config();
const handleData = require('../caps.js');
jest.spyOn(global.console, 'log');


describe('testing ordering system', () => {
  
  it('should log when data includes event and payload', async(done) => {
    let buffer = JSON.stringify({event: 'package-ready', payload: {store: 'Test Store', orderId: '1234', customer: 'Test Customer', address: '123 Main Street, AnyCity, AnyState, 12345'}})
    console.log(buffer); 
    // const dataHandled = await handleData(buffer)
    return await handleData(buffer)
    .then (results => {
      expect(results).toEqual({event: 'package-ready', payload: {store: 'Test Store', orderId: '1234', customer: 'Test Customer', address: '123 Main Street, AnyCity, AnyState, 12345'}});
       done();

    })
    // await console.log('this is the log: ', handleData(buffer))
    // expect(console.log).toContain()
    // .then(results => {
    //  expect(console.log).toHaveBeenCalled()
    // })
    .catch(err => console.log(err));
    });
  });