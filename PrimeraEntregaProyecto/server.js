const express = require("express");
const { Router } = express;
const app = express();
const routerProductos = Router();
const routerCarrito = Router();
// REQUERIMIENTOS PRODUCTOS
const Contenedor = require("./container/Contenedor");
const contenedor = new Contenedor("productos");
const timestamp = new Date().toLocaleString();
// REQUERIMIENTOS CARRITO
const ContenedorCart = require("./container/ContenedorCart");
const contenedorCarrito = new ContenedorCart("carrito");
const Cart = require("./container/Cart");

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let admin = true;
// let admin = false;

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

// RUTA PRODUCTOS
routerProductos.get("/", async (req, res) => {
  const productos = await contenedor.getAll();

  res.send(productos);
});
routerProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  const productos = await contenedor.getAll();
  const producto = await contenedor.getById(id);
  if (id > productos.length) {
    res.json({ error: "No existe el producto" });
  } else {
    res.send({ succes: true, producto: producto });
  }
});
routerProductos.post(
  "/",
  (req, res, next) => {
    if (admin == true) {
      next();
    } else {
      return res.status(403).json({
        error: true,
        descripcion: "No puede acceder a esta seccion sin ser administrador",
      });
    }
  },
  async (req, res) => {
    const { body } = req;
    await contenedor.save({ timestamp, ...body });
    res.send({ Msj: `Producto guardado: ${body.nombre}` });
  }
);
routerProductos.put(
  "/:id",
  (req, res, next) => {
    if (admin == true) {
      next();
    } else {
      return res.status(403).json({
        error: true,
        descripcion: "No puede acceder a esta seccion sin ser administrador",
      });
    }
  },
  async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, imagen, codigo, descripcion, stock } = req.body;
    await contenedor.updateById(
      id,
      timestamp,
      nombre,
      precio,
      imagen,
      codigo,
      descripcion,
      stock
    );
    res.send({ Msj: "Producto actualizado" });
  }
);
routerProductos.delete(
  "/:id",
  (req, res, next) => {
    if (admin == true) {
      next();
    } else {
      return res.status(403).json({
        error: true,
        descripcion: "No puede acceder a esta seccion sin ser administrador",
      });
    }
  },
  async (req, res) => {
    const { id } = req.params;
    await contenedor.deleteById(id);
    res.send({ Msj: "Producto Borrado" });
  }
);

// RUTA CARRITO
routerCarrito.post("/", async (req, res) => {
  let cart = new Cart();
  res.json(await contenedorCarrito.save(cart));
  res.send({ Msj: "Carrito Guardado", id: cart.id });
});

routerCarrito.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await contenedorCarrito.deleteById(id));
  res.send({ Msj: "Carrito Borrado" });
});

routerCarrito.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  let cart = await contenedorCarrito.getById(id);
  console.log(cart.products);
  if (cart.products == undefined) {
    res.json({ msg: "No hay productos" });
  } else {
    res.json({ id: cart.id, productos: cart.products });
  }
});

routerCarrito.post("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;
  const producto = await contenedor.getById(id_prod);
  const carritos = await contenedorCarrito.getAll();
  const carrito = await contenedorCarrito.getById(id);
  if (id > carritos.length) {
    res.json({ error: "No existe el carrito" });
  } else {
    const carritoActualizado = [...carrito.products, producto];

    contenedorCarrito.updateById(
      carrito.id,
      carrito.timestamp,
      carritoActualizado
    );
    res.json({ msg: "Producto agregado" });
  }
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  let { id, id_prod } = req.params;
  const carritos = await contenedorCarrito.getAll();
  const carrito = await contenedorCarrito.getById(id);
  if (id > carritos.length) {
    res.json({ error: "No existe el carrito" });
  } else {
    const listaActualizada = carrito.products.filter(
      (element) => element.id != id_prod
    );
    contenedorCarrito.updateById(
      carrito.id,
      carrito.timestamp,
      listaActualizada
    );
    res.json({ msg: "Producto eliminado" });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
