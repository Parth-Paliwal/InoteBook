const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const connectToMongo= async()=>{
    await mongoose.connect('mongodb://127.0.0.1:27017/inotebook');
    console.log("connected to mongoose");
}

module.exports = connectToMongo;