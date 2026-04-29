const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
const users = []

app.post('/sign_up' , (req , res)=>{
   const { email, password } = req.body;
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
})

app.get('/regester' , (req , res)=>{
   res.send(users)
})


app.listen(port , ()=>{
    console.log(`lisetning in port ${port}`);
})
