const { options } = require("./options/sqlite");
const knex = require("knex")(options);

class ContenedorMsg {
  constructor(table) {
    this.table = table;
  }

  async getAll() {
    try {
      const mensajes = await knex(this.table).select("*");
      return mensajes;
    } catch (error) {
      console.log(error);
    }
  }

  async save(objMsg) {
    try {
      await knex(this.table).insert(objMsg);
      console.log("Mensaje guardado: ", objMsg);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ContenedorMsg;
