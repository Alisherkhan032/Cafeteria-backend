const mongoose = require('mongoose');
const DB_URI = process.env.DB_URI;

const connectDb = async ()=>{
    try{
        await mongoose.connect(DB_URI);
        console.log('Database connected');
    }catch(err){
        console.log(err);
    }
}

module.exports = connectDb;