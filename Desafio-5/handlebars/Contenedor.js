const fs = require("fs")

class Contenedor {
    constructor () {
        this.nombre = './productos.json';
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.nombre, "utf-8");
            if(data.length>0) {
                const productos = JSON.parse(data);
                return productos;
            }else {
                return [];
            }
        }catch (err) {
            return "No se pudo leer los archivos";
        }
    }

    async save(objProd) {
        try {
            if(fs.existsSync(this.nombre)) {
                const listado = await this.getAll();
                const id = listado.length + 1;

                objProd.id = id;

                listado.push(objProd);
                await fs.promises.writeFile(this.nombre, JSON.stringify(listado));
            }else {
                objProd.id = 1;
                await fs.promises.writeFile(this.nombre, JSON.stringify([objProd]));
            }
            

        }catch (err) {
            return "No se guardo el producto";

        }

    }

    async getById(id) {
        try {
            const productos = await this.getAll();
            const producto = productos.find(element => element.id == id);
            return producto;
        }catch (err) {
            return "El producto no se encontro";
        }

    }

    async deleteById(id) {
        try {
            const productos = await this.getAll();
            const prodActualizados = productos.filter(element => element.id != id);
            await fs.promises.writeFile(this.nombre, JSON.stringify(prodActualizados));
            return `El producto ${id} se ha eliminado`
        }catch (err) {
            return "No se pudo eliminar el producto"
        }
    }

    async deleteAll() {
        try {
            const vacio = [];
            await fs.promises.writeFile(this.nombre, JSON.stringify(vacio));
            return "Productos Borrados"
        }catch(err) {
            return "No se pudieron borrar los productos"
        }
        
    }

    async updateById(id, nombre, precio, imagen) {
        try {
            const productos = await this.getAll();
            const producto = productos.find((element) => element.id == id);
            if (producto) {
                producto.nombre = nombre;
                producto.precio = precio;
                producto.imagen = imagen;
                await fs.promises.writeFile(this.nombre, JSON.stringify(productos));
                return producto;
            }else {
                return "El producto no se encontro"
            }
        } catch (err) {
            return "No se pudo actualizar el producto"
        }
    };
}

module.exports = Contenedor;










