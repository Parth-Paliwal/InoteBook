const express = require('express');
var cors = require('cors');
const connectToMongo = require('./db');
const app = express();
const port = 5000;
app.use(cors())
connectToMongo();

app.use(express.json())
app.use('/notes' , require('./routes/notes'))
app.use('/createUser' , require('./routes/user'))

app.get('/' , (req , res)=>{
   res.send("hello world")
})

app.listen(port , ()=>{
    console.log('this app is listning on port : '+ port);
})