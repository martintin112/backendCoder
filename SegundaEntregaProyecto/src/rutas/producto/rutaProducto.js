import { Router } from "express";
import { DaoProducto } from "../../daos/seleccionDaos.js";

const routerProductos = Router();
const timestamp = new Date().toLocaleString();
let admin = true;
// RUTA PRODUCTOS
routerProductos.get("/", async (req, res) => {
  const productos = await DaoProducto.getAll();

  res.send(productos);
});
routerProductos.get("/:id", async (req, res) => {
  const { id } = req.params;
  const productos = await DaoProducto.getAll();
  const producto = await DaoProducto.getById(id);
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
    await DaoProducto.save({ timestamp, ...body });
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
    await DaoProducto.updateById(
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
    await DaoProducto.deleteById(id);
    res.send({ Msj: "Producto Borrado" });
  }
);

export { routerProductos };
