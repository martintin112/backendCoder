import { model, Schema } from "mongoose";

const ColeccionMsgs = "msgs";

// const PublicacionAutor = new Schema({
//   id: { type: String, required: true, max: 100 },
//   nombre: { type: String, required: true, max: 150 },
//   apellido: { type: String, required: true, max: 150 },
//   edad: { type: Number, required: true, max: 100 },
//   alias: { type: String, required: true },
//   avatar: { type: String, required: true, max: 150 },
// });

const MensajeSchema = new Schema({
  autor: {
    id: { type: String, required: true, max: 100 },
    nombre: { type: String, required: true, max: 150 },
    apellido: { type: String, required: true, max: 150 },
    edad: { type: Number, required: true, max: 100 },
    alias: { type: String, required: true },
    avatar: { type: String, required: true, max: 150 },
  },
  fecha: { type: String, required: true, max: 150 },
  mensaje: { type: String, required: true, max: 150 },
});
export const Mensajes = model("msg", MensajeSchema);
export const modeloMsgs = { ColeccionMsgs, MensajeSchema };
