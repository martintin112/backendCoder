import { Schema } from "mongoose";

const ColeccionProductos = "productos";

const ProductoSchema = new Schema({
  nombre: { type: String, required: true, max: 100 },
  descripcion: { type: String, required: true, max: 150 },
  imagen: { type: String, required: true, max: 150 },
  codigo: { type: String, required: true, max: 100 },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true, default: 1 },
  timestamp: { type: String, required: true, max: 100 },
});

export const modeloProducto = { ColeccionProductos, ProductoSchema };
