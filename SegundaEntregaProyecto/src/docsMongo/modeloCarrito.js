import { Schema } from "mongoose";

const ColeccionCarritos = "carritos";

const CarritoSchema = new Schema({
  timestamp: { type: String, required: true, max: 100 },
  productos: [{ type: Schema.Types.ObjectId, ref: "productos" }],
});

export const modeloCarrito = { ColeccionCarritos, CarritoSchema };
