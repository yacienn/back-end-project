import { pool } from '../config/db.js';

export const addPets = async(req , res)=>{
    const {name , type} = req.body ;
    try{    
            const newPet = await pool.query("INSERT INTO pets (name , type) VALUES($1 , $2) RETURNING *" , [name , type])
            res.status(201).json({
      message: "Pet added successfully",
      pet: newPet.rows[0]
    });
    }catch(e){
            res.status(500).json({ message: e.message });
           
    }
}
