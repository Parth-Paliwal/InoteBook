const mongoose = require('mongoose');
const {Schema} = mongoose;
const ShareSchema = new Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "sender"
    },
    senderMail :{
        type:String,
        ref :"senderMailId"
    },
    reciever :{
        type:String,
        ref : "reciever"
    },
    Title :{
        type : String,
        required : true
    },
    discription :{
        type : String , 
        required : true
    },
    tag :{
        type :String,
        default : 'general'
    },
    date : {
        type :Date,
        default : Date.now
    },    
})

module.exports = mongoose.model('share' , ShareSchema)