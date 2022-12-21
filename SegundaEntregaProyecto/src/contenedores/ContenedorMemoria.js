class ContenedorMemoria {
  constructor() {
    this.elements = [];
  }

  getAll() {
    return this.elements;
  }

  save(element) {
    const elementos = this.getAll();

    element.id =
      !elementos || !elementos.length
        ? (element.id = 1)
        : elementos.forEach((o) => {
            element.id = o.id + 1;
          });

    this.elements.push(element);

    return element;
  }

  getById(id) {
    return this.elements.find((element) => element.id == id);
  }

  updateById(id, obj) {
    let item = this.elements.find((element) => element.id == id);
    if (!item) {
      return "Item no encontrado";
    }
    item = { item, ...obj };
    return this.elements.id;
  }

  deleteById(id) {
    this.elements.filter((element) => element.id != id);
    return { success: true };
  }
}

export { ContenedorMemoria };
