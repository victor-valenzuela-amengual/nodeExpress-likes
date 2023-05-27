const express = require('express')
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require('cors')

app.listen(PORT, console.log(`Escuchando por el puerto ${PORT}`))
app.use(express.json())
app.use(cors())

const { ObtenerLikes,AgregarLike,EliminarLike } = require('./consultas');

app.get('/likes', async (req, res) => {
    const data = await ObtenerLikes();
    res.json(data);
});

app.post('/likes', async (req, res) => {
    try {
        const { titulo,imagen,descripcion,likes } = req.body
        await AgregarLike(titulo,imagen,descripcion,likes)
        res.send("Like a " + titulo + " sumado")
    }
    catch (error) {
        res.send(error);
    }
});

app.delete("/likes", async (req, res) => {
    try{       
        const { id } = req.body
        await EliminarLike(id)
        res.send("Like " + id + " eliminado")
    }
    catch(error){
        res.send(error);
    }
    })
