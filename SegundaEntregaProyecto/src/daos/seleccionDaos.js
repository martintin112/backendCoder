import mongoose from "mongoose";
import { config } from "../config/confDotenv.js";
import {
  ProductosMongo,
  ProductosFilesystem,
  ProductosMemoria,
  ProductosFirebase,
} from "./Productos/daosProductos.js";
import {
  CarritosMongo,
  CarritosFilesystem,
  CarritosMemoria,
  CarritosFirebase,
} from "./Carritos/daosCarritos.js";

const seleccionDaos = () => {
  switch (config.SERVER.selecBaseDeDatos) {
    case "mongoDB": {
      mongoose.connect(config.DATABASES.mongoDB.url, {
        dbName: config.DATABASES.mongoDB.dbName,
      });
      console.log("Conectado a mongoDB");
      return {
        DaoProducto: new ProductosMongo(),
        DaoCarrito: new CarritosMongo(),
      };
    }
    case "filesystem": {
      return {
        DaoProducto: new ProductosFilesystem(),
        DaoCarrito: new CarritosFilesystem(),
      };
    }
    case "memoria": {
      return {
        DaoProducto: new ProductosMemoria(),
        DaoCarrito: new CarritosMemoria(),
      };
    }
    case "firebase": {
      return {
        DaoProducto: new ProductosFirebase(),
        DaoCarrito: new CarritosFirebase(),
      };
    }
  }
};

const { DaoProducto, DaoCarrito } = seleccionDaos();
export { DaoProducto, DaoCarrito };
