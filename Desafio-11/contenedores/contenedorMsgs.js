import { ContenedorMongo } from "./ContenedorMongo.js";
import { modeloMsgs } from "../schemaMongo/modeloMsg.js";

export class ContenedorMsgs extends ContenedorMongo {
  constructor() {
    super({
      nombre: modeloMsgs.ColeccionMsgs,
      schema: modeloMsgs.MensajeSchema,
    });
  }
}
