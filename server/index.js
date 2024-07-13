require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost:3306",
    user: "sealmark_wp373",
    password: "t#gLZi3fSD^W",
    database: "sealmark_empleados_crud"
});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)',[nombre,edad,pais,cargo,anios],
        (err,result)=>{
            if(err){
                console.groupCollapsed(err);
            }else{
                res.send(result);
            }
        }
    );
})

app.get("/empleados",(req,res)=>{
    
    db.query('SELECT * FROM empleados',
        (err,result)=>{
            if(err){
                console.groupCollapsed(err);
            }else{
                res.send(result);
            }
        }
    );
})

app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados SET nombre=?,edad=?,pais=?,cargo=?,anios=? WHERE id=?',[nombre,edad,pais,cargo,anios,id],
        (err,result)=>{
            if(err){
                console.groupCollapsed(err);
            }else{
                res.send(result);
            }
        }
    );
})

app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?',id,
        (err,result)=>{
            if(err){
                console.groupCollapsed(err);
            }else{
                res.send(result);
            }
        }
    );
})

app.listen(port,()=>{
    console.log(`Corriendo en el puerto ${port}`)
})