const express = require("express");
const app = express();
const port = 3000 ;
const users = []
app.get('/users' , (req , res)=>{
     res.status(201).send(users);
});

app.listen(port , ()=>{
    console.log(`i listen on port ${port}`);
})
