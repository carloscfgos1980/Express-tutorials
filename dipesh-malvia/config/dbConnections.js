const mongooose = require('mongoose');

const connectDB = async()=>{
    try{
        const connect = await mongooose.connect(process.env.CONNECTION_STRING);
        console.log("database connected:", 
        connect.connection.host,
        connect.connection.name
        );
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;