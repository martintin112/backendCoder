import { ContenedorFilesystem } from "../../contenedores/indiceContenedores.js";
import { config } from "../../config/confDotenv.js";

export class ProductosFilesystem extends ContenedorFilesystem {
  constructor() {
    super(config.DATABASES.filesystem.PRODUCTOS_LISTADO);
  }
}
