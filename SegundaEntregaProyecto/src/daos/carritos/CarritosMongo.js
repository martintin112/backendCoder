import { ContenedorMongo } from "../../contenedores/indiceContenedores.js";
import { modeloCarrito } from "../../docsMongo/modeloCarrito.js";

export class CarritosMongo extends ContenedorMongo {
  constructor() {
    super({
      nombre: modeloCarrito.ColeccionCarritos,
      schema: modeloCarrito.CarritoSchema,
    });
  }

  async getById(id) {
    const res = await this.model.findById(id).populate("productos");

    return res;
  }
}
