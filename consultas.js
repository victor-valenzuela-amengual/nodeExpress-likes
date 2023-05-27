const { Pool } = require('pg');
const express = require('express')
const app = express();

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'p0stgr3s',
    database: 'likeme',
    allowExitOnIdle: true,
    port:5432
});

const ObtenerLikes = async ()=>{
    const {rows} = await pool.query("SELECT * FROM posts");
   
    return rows;
}
const AgregarLike = async (titulo,imagen,descripcion,likes) => {
    try{
        const consulta = "INSERT INTO posts(titulo,img,descripcion,likes) values ($1, $2, $3, $4)"
        const values = [titulo,imagen,descripcion,likes];
        const result = await pool.query(consulta,values);    
    }
    catch(error)
    {
        console.log(error.code);
    }    
}

const EliminarLike = async (id) => {
    try {
        const consulta = "DELETE FROM posts WHERE ID = $1"        
        const values = [id];
        const result = await pool.query(consulta,values);
        //console.log(result.rowCount.toString() + ' registro eliminado');
    }
    catch{
        console.log("Error");
    }
    
}
module.exports={ObtenerLikes,AgregarLike,EliminarLike};