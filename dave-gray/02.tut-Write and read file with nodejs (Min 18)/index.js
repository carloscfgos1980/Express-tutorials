// const fs = require('fs');
const path = require('path');

const fsPromise = require('fs').promises

const fileOps = async ()=> {
    try{
        const data = await fsPromise.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data);
        await fsPromise.writeFile(path.join(__dirname, 'files', 'PromisesWrite.txt'), data);
        await fsPromise.appendFile(path.join(__dirname, 'files', 'PromisesWrite.txt'), '\n\n Nice to meet you');
        await fsPromise.rename(path.join(__dirname, 'files', 'PromisesWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt'));
        const newData = await fsPromise.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
        console.log(newData);
    } catch (err){
        console.error(err);
    }
}

fileOps();

// fs.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// }); 

console.log('Hello...');

const text = 'Nice to meet you';

// fs.writeFile(path.join(__dirname, 'files', 'reply.txt'), text , (err) => {
//   if (err) throw err;
//   console.log('Write complete');

//   const appendText = 'Some extra shit';
  
//   fs.appendFile(path.join(__dirname, 'files', 'reply.txt'), appendText , (err) => {
//     if (err) throw err;
//     console.log('Append text');
//   });
// });


// exit on uncaught process
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})