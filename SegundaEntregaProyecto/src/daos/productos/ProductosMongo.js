import { ContenedorMongo } from "../../contenedores/indiceContenedores.js";
import { modeloProducto } from "../../docsMongo/modeloProducto.js";

export class ProductosMongo extends ContenedorMongo {
  constructor() {
    super({
      nombre: modeloProducto.ColeccionProductos,
      schema: modeloProducto.ProductoSchema,
    });
  }
}
