import { Router } from "express";
import { DaoProducto, DaoCarrito } from "../../daos/seleccionDaos.js";

const routerCarrito = Router();
const timestamp = new Date().toLocaleString();

// RUTA CARRITO
routerCarrito.post("/", async (req, res) => {
  let base = { timestamp: timestamp, productos: [] };
  await DaoCarrito.save(base);
  res.send({ Msj: "Carrito Guardado" });
});

routerCarrito.delete("/:id", async (req, res) => {
  const { id } = req.params;
  res.json(await DaoCarrito.deleteById(id));
  res.send({ Msj: "Carrito Borrado" });
});

routerCarrito.get("/:id/productos", async (req, res) => {
  const { id } = req.params;
  let cart = await DaoCarrito.getById(id);
  console.log(cart.productos);
  if (cart.productos == undefined) {
    res.json({ msg: "No hay productos" });
  } else {
    res.json({ id: cart.id, productos: cart.productos });
  }
});

routerCarrito.post("/:id/productos/:id_prod", async (req, res) => {
  const { id, id_prod } = req.params;
  const producto = await DaoProducto.getById(id_prod);
  const carritos = await DaoCarrito.getAll();
  const carrito = await DaoCarrito.getById(id);
  if (id > carritos.length) {
    res.json({ error: "No existe el carrito" });
  } else {
    const carritoActualizado = [...carrito.productos, producto];

    DaoCarrito.updateById(carrito.id, carrito.timestamp, carritoActualizado);
    res.json({ msg: "Producto agregado" });
  }
});

routerCarrito.delete("/:id/productos/:id_prod", async (req, res) => {
  let { id, id_prod } = req.params;
  const carritos = await DaoCarrito.getAll();
  const carrito = await DaoCarrito.getById(id);
  if (id > carritos.length) {
    res.json({ error: "No existe el carrito" });
  } else {
    const listaActualizada = carrito.productos.filter(
      (element) => element.id != id_prod
    );
    DaoCarrito.updateById(carrito.id, carrito.timestamp, listaActualizada);
    res.json({ msg: "Producto eliminado" });
  }
});

export { routerCarrito };
