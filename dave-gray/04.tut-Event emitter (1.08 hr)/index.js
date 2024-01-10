const logEvents = require('./logEvents');

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {};

//initilize object
const myEmitter = new MyEmitter();

//add listener for the event
myEmitter.on('log', (msg)=> logEvents(msg));

setTimeout(()=>{
    // Emit event
    myEmitter.emit('log', 'Log event emitted!')
}, 2000);