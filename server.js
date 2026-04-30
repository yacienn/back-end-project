import express from 'express';
import bcrypt from 'bcrypt'
import { pool } from './config/db.js';

const app = express();
const port = 3000;
app.use(express.json());

//sign up
app.post('/sign_up' , async(req , res)=>{
   const { email, password } = req.body;
   try {
      const userExist = await pool.query(
        "SELECT * FROM users WHERE email = $1" , 
        [email]
      );
    if (userExist.rows.length > 0) {
        return res.status(409).json({
            message: "User already exists"
        });
    }
    const hashPassword = await bcrypt.hash(password , 10);
    const newUser = await pool.query(
        "INSERT INTO users (email , password ) VALUES ($1 , $2 ) RETURNING id , email" ,
        [email , hashPassword]
    )
    res.status(201).json({
        message : "user create successfuly" ,
        user : newUser.rows[0]
    });
   }catch(e){
    res.status(500).send({
        message : e.message
    })}
   
})

//log in 
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


app.get('/regester' ,async (req , res)=>{
    const result = await pool.query(
        "SELECT * FROM users"
    )
    res.json(
    {message : "user is :" ,
      users  : result.rows
    }
   );
})

app.listen(port , ()=>{
    console.log(`lisetning in port ${port}`);
    
})
