import express from 'express'
import crypto from "crypto";


const app = express();
const port = 3000;
app.use(express.json());

const sessions = {}; //* for store tokens ;   {sessions = {
//  "a1b2c3d4": { email: "test@gmail.com", password: "1234" }
const users = [];

//register (new user )endpoint ---> create 
app.post("/register", (req, res) => {

    const { email, password , role } = req.body;
    try {
        const existUser = users.find(user => user.email === email);
        if (existUser) {
            return res.status(400).send("user arleady exsists !!!");
        } else {
            // default role = user 
            users.push({ email, password , role : role || "user" });
            res.status(201).send(`Registration successful! Role: ${role || "user"}`);
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

})

//log in endpoint ---->search 2
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    try {
        const existUser = users.find(user => user.email === email && user.password === password);
        if (!existUser) {
            res.status(401).send("user dont exsit in database");
        } else {
            //Create random token : And Store it into the sessions
            const token = crypto.randomBytes(16).toString("hex");
            sessions[token] = existUser;
            res.status(200).json({ message: "Login successful!", token });

        };
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

});

//protect token ;
app.get("/dashboard" , (req , res)=>{
    const token = req.headers["authorization"];
    const user = sessions[token];
    if (!user){
        res.status(401).send("user not autorized !!");
    }else{
       res.status(200).send(`welcome : ${user.email}`);
    }
})



app.listen(port, () => {
    console.log(`listening on port ${port}`);
})