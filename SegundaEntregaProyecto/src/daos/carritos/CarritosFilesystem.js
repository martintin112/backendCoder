import { ContenedorFilesystem } from "../../contenedores/indiceContenedores.js";
import { config } from "../../config/confDotenv.js";

export class CarritosFilesystem extends ContenedorFilesystem {
  constructor() {
    super(config.DATABASES.filesystem.CARRITOS_LISTADO);
  }
}
