const fs = require("fs");

class ContenedorMsg {
  constructor() {
    this.nombre = "./mensajes.json";
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

  async save(objMsg) {
    try {
      if (fs.existsSync(this.nombre)) {
        const listado = await this.getAll();
        const id = listado.length + 1;

        objMsg.id = id;

        listado.push(objMsg);
        await fs.promises.writeFile(this.nombre, JSON.stringify(listado));
      } else {
        objMsg.id = 1;
        await fs.promises.writeFile(this.nombre, JSON.stringify([objMsg]));
      }
    } catch (err) {
      return "No se guardo el mensaje";
    }
  }
}

module.exports = ContenedorMsg;
