const { options } = require("./options/mysql");
const knex = require("knex")(options);

// ----- CREAR TABLA-----
knex.schema
  .createTable("productos", (table) => {
    table.increments("id"),
      table.string("nombre"),
      table.integer("precio"),
      table.string("imagen");
  })
  .then(() => {
    console.log("Se pudo armar la tabla");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });

// -----AGREGAR ALGO A LA TABLA-----
knex("productos")
  .insert([
    {
      nombre: "Samsung Tab S7",
      precio: 120000,
      imagen: "https://i.postimg.cc/7Z9qb2jG/S7Tab.png",
      descripcion: "Este es un buen producto",
    },
    {
      nombre: "Samsung A32",
      precio: 76000,
      imagen: "https://i.postimg.cc/BbVTLfyb/samsung-A32.png",
      descripcion: "Este es un buen producto",
    },
    {
      nombre: "Iphone 13 pro",
      precio: 350000,
      imagen: "https://i.postimg.cc/65sWPwd3/iphone13.jpg",
      descripcion: "Este es un buen producto",
    },
  ])
  .then((res) => {
    console.log("logre insertar los productos", res);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    knex.destroy();
  });

// -----VER TODO LO QUE TENGO EN LA TABLA, CON SUS RESPECTIVOS CAMPOS-----
knex
  .from("productos")
  // EL ASTERISCO ES PARA QUE ME DE TODOS LOS CAMPOS
  .select("*")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    knex.destroy();
  });
