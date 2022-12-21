import { routerProductos } from "./src/rutas/producto/rutaProducto.js";
import { routerCarrito } from "./src/rutas/carrito/rutaCarrito.js";
import express from "express";
const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarrito);

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
