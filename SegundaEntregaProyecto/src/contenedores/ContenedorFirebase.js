import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const serviceAccount = require("../config/privi.json");
// import serviceAccount from "../config/privi.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

class ContenedorFirebase {
  constructor(nombreColeccion) {
    this.coleccion = db.collection(nombreColeccion);
    this.id = 1;
  }

  getAll = async () => {
    try {
      const listado = await this.coleccion.get();
      let items = listado.docs;
      console.log(items);
      return items;
    } catch (error) {
      console.log(error);
    }
  };

  save = async (obj) => {
    try {
      const listado = await this.getAll();
      let id;
      if (!listado || !listado.length) {
        id = 1;
      } else {
        listado.forEach((o) => {
          id = o.id;
        });
        id = parseInt(id) + 1;
      }
      const nuevoCarrito = { ...obj, id };
      await this.coleccion.doc(`${id}`).set(nuevoCarrito);
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (id) => {
    try {
      const elemento = this.coleccion.doc(id);
      const obj = await elemento.get();
      const res = obj.data();
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  updateById = async (obj, id) => {
    try {
      const elemento = this.colection.doc(id);
      const itemActualizado = await elemento.update({ ...obj });
      console.log(itemActualizado);
      console.log(`Se actualizo el item. id: ${id}`);
      return itemActualizado;
    } catch (error) {
      console.log(error);
    }
  };

  deleteById = async (id) => {
    try {
      const elemento = this.coleccion.doc(id);
      const itemBorrado = await elemento.delete();
      console.log(`Se borro el documento. id: ${id}`);
      return itemBorrado;
    } catch (error) {
      console.log(error);
    }
  };

  deleteAll = async () => {
    try {
      const elemento = this.coleccion.doc();
      const objetos = await elemento.delete();
      return objetos;
    } catch (error) {
      console.log(error);
    }
  };

  async desconectar() {}
}

export { ContenedorFirebase };
