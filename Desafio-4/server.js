const express = require('express');
const { Router } = express;
const app = express();
const routerProductos = Router();
const Contenedor = require('./Contenedor');
const contenedor = new Contenedor('productos');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const PORT = process.env.PORT || 8080;

app.use('/api/productos', routerProductos);

app.get('/', (req, res) => {
    res.send("<a href='/api/productos'>Total de productos</a> <a href='/form'>Formulario</a>")
});

app.get('/form', async (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

routerProductos.get('/', async (req, res) => {
    const productos = await contenedor.getAll();
    
    res.send(productos);
});

routerProductos.get('/:id', async (req, res) => {
    const { id } = req.params;
    const productos = await contenedor.getAll();
    const producto = await contenedor.getById(id);
    if(id > productos.length) {
        res.json({error: "No existe el producto"})
    }else{
        res.send({succes: true, producto: producto});
    }
    
});

app.post('/form', (req, res) => {
    const { body } = req;
    contenedor.save(body);
    console.log(body)
    res.send("Gracias por cargar los datos")
})

routerProductos.post('/', async (req, res) => {
    const { body } = req;
    await contenedor.save(body);
    res.send({Msj:`Producto guardado: ${body.nombre}`})
});

routerProductos.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, imagen } = req.body;
    await contenedor.updateById(id, nombre, precio, imagen);
    res.send({Msj: "Producto actualizado"})
});

routerProductos.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await contenedor.deleteById(id);
    res.send({Msj: "Producto Borrado"})
})

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})
