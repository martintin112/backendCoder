const fs = require("fs");

class ContenedorCart {
  constructor() {
    this.timesmap = new Date().toLocaleString();
    this.nombre = "./carrito.json";
  }

  async getAll() {
    try {
      const data = await fs.promises.readFile(this.nombre, "utf-8");
      if (data.length > 0) {
        const productos = JSON.parse(data);
        return productos;
      } else {
        return [];
      }
    } catch (err) {
      return "No se pudo leer los archivos";
    }
  }

  async save(objProd) {
    try {
      if (fs.existsSync(this.nombre)) {
        const listado = await this.getAll();
        const id = listado.length + 1;

        objProd.id = id;

        listado.push(objProd);
        await fs.promises.writeFile(this.nombre, JSON.stringify(listado));
      } else {
        objProd.id = 1;
        await fs.promises.writeFile(this.nombre, JSON.stringify([objProd]));
      }
    } catch (err) {
      return "No se guardo el carrito";
    }
  }

  async getById(id) {
    try {
      const productos = await this.getAll();
      const producto = productos.find((element) => element.id == id);
      return producto;
    } catch (err) {
      return "El carrito no se encontro";
    }
  }

  async deleteById(id) {
    try {
      const productos = await this.getAll();
      const prodActualizados = productos.filter((element) => element.id != id);
      await fs.promises.writeFile(
        this.nombre,
        JSON.stringify(prodActualizados)
      );
      return `El carrito ${id} se ha eliminado`;
    } catch (err) {
      return "No se pudo eliminar el carrito";
    }
  }

  async deleteAll() {
    try {
      const vacio = [];
      await fs.promises.writeFile(this.nombre, JSON.stringify(vacio));
      return "Carritos Borrados";
    } catch (err) {
      return "No se pudieron borrar los carritos";
    }
  }

  async updateById(id, timestamp, products) {
    try {
      const carritos = await this.getAll();
      const carrito = carritos.find((element) => element.id == id);
      if (carrito) {
        carrito.timestamp = timestamp;
        carrito.products = products;
        await fs.promises.writeFile(this.nombre, JSON.stringify(carritos));
        return carrito;
      } else {
        return "El carrito no se encontro";
      }
    } catch (err) {
      return "No se pudo actualizar el carrito";
    }
  }
}

module.exports = ContenedorCart;
