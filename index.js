const express= require('express');
const app =express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connection =require('./db');
const bcrypt = require('bcryptjs');




dotenv.config();
//create post request for register route

app.use(express.static('frontEnd'))
app.use(bodyParser.json())

app.post('/register',async (req,res)=> {
    console.log(req.body.username);
    const {username, email, password, firstName, lastName} = req.body;
    const hashedpassword = await bcrypt.hash(password,10)
  
    connection 
.promise() 

.query(
    'INSERT INTO users (username, email, password, firstName, lastName) VALUES (?, ?, ?, ?, ?)',
    [username, email, hashedpassword, firstName, lastName]

);
});



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
});
