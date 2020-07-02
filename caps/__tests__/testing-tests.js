'use strict';

import { SocketIO, Server } from 'mock-socket';


require('dotenv').config();
const test = require('../caps.js');
jest.spyOn(global.console, 'log');


const io = require('socket.io-client');
const http = require('http');
const ioBack = require('socket.io');

let socket;
let httpServer;
let httpServerAddr;
let ioServer = SocketIO;

/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
  // httpServer = http.createServer().listen();
  // httpServerAddr = httpServer.listen().address();
  ioServer = ioBack(3000);
  done();
});

/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
  ioServer.close();
  // httpServer.close();
  done();
});

/**
 * Run before each test
 */
// beforeEach((done) => {
//   // Setup
//   // Do not hardcode server port and address, square brackets are used for IPv6
//   socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
//     'reconnection delay': 0,
//     'reopen delay': 0,
//     'force new connection': true,
//     transports: ['websocket'],
//   });
//   socket.on('connect', () => {
//     done();
//   });
// });

// /**
//  * Run after each test
//  */
// afterEach((done) => {
//   // Cleanup
//   if (socket.connected) {
//     socket.disconnect();
//   }
//   done();
// });



describe('testing ordering system', () => {
  it('should log when package ready for pickup', (done) => {
    let payload = ({store: 'Test Store', orderId: '1234', customer: 'Test Customer', address: '123 Main Street, AnyCity, AnyState, 12345'})
    test.handlePickup(payload);
    expect(console.log).toHaveBeenCalled()
    
    done();
  });

});