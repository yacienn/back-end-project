import express from 'express';
import bcrypt from 'bcrypt'

const app = express();
const port = 3000;
app.use(express.json());
const users = []

//sign_uo
app.post('/sign_up' , async(req , res)=>{
   const { email, password } = req.body;
   try {
      const userExist = users.find(u => u.email === email);
    if (userExist) {
        return res.status(409).json({
            message: "User already exists"
        });
    }
    const hashPassword = await bcrypt.hash(password , 10);
    const newUser = {email , hashPassword};
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

//log_in
app.post('/log_in' , async(req , res)=>{
      const  {email , password } = req.body ;
      try {
const user = users.find(u => u.email === email);
      if (!user){
        return res.status(404).json({
            message : "user no exist yet "
        })
      }
      const isMatch = await bcrypt.compare(password , user.hashPassword)
    if (!isMatch){
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

//regester
app.get('/regester' , (req , res)=>{
   res.send(users);
})


app.listen(port , ()=>{
    console.log(`lisetning in port ${port}`);
})
