const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");


const connection = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"crud_contact"
});


 app.use(cors());
 app.use(express.json());
 app.use(bodyparser.urlencoded({extended:true}));
 
 
 
 
 app.get("/api/get",(req , res) =>{
    const sqlGet = "SELECT * FROM  contact_db";
    connection.query(sqlGet, (error , result) => {
       res.send(result)
      })
   });
   
   
   app.post("/api/post",(req , res) => {
     const {name, email, contact}= req.body;
     const sqlInsert = 
     "INSERT INTO contact_db (name , email , contact) VALUES (?,?,?)";
     connection.query(sqlInsert, [name , email, contact],(error ,result) => {
     if(error){
        console.log(error)
     }
    })
   })

   app.delete("/api/remove/:id",(req , res) => {
      const {id}= req.params;
      const sqlRemove = 
      "DELETE FROM contact_db WHERE id =?";
      connection.query(sqlRemove, id,(error ,result) => {
      if(error){
         console.log(error)
      }
     })
    })

    app.get("/api/get/:id",(req , res) =>{
      const {id} = req.params;
      const sqlGet = "SELECT * FROM  contact_db where id =?";
      connection.query(sqlGet,id, (error , result) => {
         if(error){
            console.log(error)
         }
         res.send(result)
        })
     });

     app.put("/api/update/:id",(req , res) =>{
      const {id} = req.params;
      const {name , email , contact} = req.body;
      const sqlUpdate = "UPDATE contact_db SET name =?, email =?,contact=? WHERE id =?";
      connection.query(sqlUpdate,[name ,email, contact, id], (error , result) => {
         if(error){
            console.log(error)
         }
         res.send(result)
        })
     });



 app.get("/", (req , res) =>{
    // const sqlInsert = "INSERT INTO contact_db (name , email , contact) VALUES ('Gopal Prasad','gopa@gmail.com',8759577264)";
    // db.query(sqlInsert , (error, result) =>{
    //     console.log("error",error)
    //     console.log("result",result)
    //     res.send("This app is runing ")
    // })
 })


 app.listen(5000, () =>{
    console.log("server is started on port no 5000")
 })
