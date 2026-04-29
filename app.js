const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const users = []

app.post('/sign_up' , (req , res)=>{
   const { email, password } = req.body;
   try {
      const userExist = users.find(u => u.email === email);
    if (userExist) {
        return res.status(409).json({
            message: "User already exists"
        });
    }
    const newUser = {email , password};
    users.push(newUser);
    res.status(201).json({
        message : "user create successfuly" ,
        user : newUser
    });
   }catch(e){
    res.status(500).send({
        message : e.message
    })}
   
})

app.post('/log_in' , (req , res)=>{
      const  {email , password } = req.body ;
      try {
const user = users.find(u => u.email === email);
      if (!user){
        return res.status(404).json({
            message : "user no exist yet "
        })
      }
    if (user.password != password){
        return res.status(401).json({
            message : "password wrong "
        })
    }
        res.status(200).json({
            message : "welcome" ,
            user : email 
        })
      }catch(e){
        res.status(500).send({
            message : e.message 
        });
      }
      
})

app.get('/regester' , (req , res)=>{
   res.send(users);
})


app.listen(port , ()=>{
    console.log(`lisetning in port ${port}`);
})
