import mongoose from "mongoose";

class ContenedorMongo {
  constructor({ nombre, schema }) {
    this.model = mongoose.model(nombre, schema);
  }

  async getAll() {
    const elementos = await this.model.find();
    return elementos;
  }

  async save(obj) {
    const nuevoElemento = await this.model.create(obj);
    return nuevoElemento;
  }

  async getById(id) {
    const elemento = await this.model.findById(id);

    return elemento;
  }

  async updateById(id, obj) {
    const elementoActualizado = await this.model.findByIdAndUpdate(id, obj, {
      new: true,
    });
    return elementoActualizado;
  }

  async deleteById(id) {
    const elementoBorrado = await this.model.findByIdAndDelete(id);
    return elementoBorrado;
  }
}

export { ContenedorMongo };
