import React, { useState } from "react";

function App() {

  const [foods , setFood] = useState(["spagiti" , "pizza" , "beef"]);
  function addFood(){
      const newFood = document.getElementById("input").value ;
      document.getElementById("input").value = "" ;
      setFood([...foods , newFood]);
  }
  function removefood(index){
     setFood(foods.filter((_ , i)=>i !== index));
  }
  return (
    <div className="FOOD">
       <h2>Food list</h2>
          <ul>
               {foods.map((food , index) =>
               <li key = {index} onClick={()=>removefood(index)}> {food} </li> )}
          </ul>
       <input type ="text" id = "input" placeholder="enter a food" ></input>
       <button onClick={addFood}>add food</button>

    </div>
  );
}



export default App;