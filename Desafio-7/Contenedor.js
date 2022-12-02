const { options } = require("./options/mysql");
const knex = require("knex")(options);

class Contenedor {
  constructor(table) {
    this.table = table;
  }

  async getAll() {
    try {
      const productos = await knex(this.table).select("*");
      return productos;
    } catch (error) {
      console.log(error);
    }
  }

  async save(objProd) {
    try {
      await knex(this.table).insert(objProd);
      console.log("Producto Guardado ", objProd);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Contenedor;
