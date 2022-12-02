const { options } = require("./options/sqlite");
const knex = require("knex")(options);

// ----- CREAR TABLA-----
knex.schema
  .createTable("mensajes", (table) => {
    table.increments("id"),
      table.string("socketid"),
      table.string("fecha"),
      table.string("email"),
      table.string("mensaje");
  })
  .then(() => {
    console.log("Se creo la tabla de mensajes");
  })
  .catch((err) => {
    console.log(err);
    throw new Error(err);
  })
  .finally(() => {
    knex.destroy();
  });

// -----AGREGAR ALGO A LA TABLA-----
// knex("mensajes")
//   .insert([
//     {
//       socketid: "KSsaHXsubiYRodyeAAAB",
//       fecha: "17 11 2022 07:45 57 pm",
//       email: "martin@martin.com",
//       mensaje: "holaa",
//     },
//     {
//       socketid: "xRVLtyvd1umMBaYJAAAB",
//       fecha: "20 11 2022 01:01 05 am",
//       email: "maartn@gmail.com",
//       mensaje: "holahola",
//     },
//     {
//       socketid: "evtd0aXt_DJsZVzgAAAB",
//       fecha: "20 11 2022 01:01 21 am",
//       email: "maartn@gmail.com",
//       mensaje: "holaholahola",
//     },
//   ])
//   .then((res) => {
//     console.log("logre insertar varios autos", res);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     knex.destroy();
//   });

// -----VER TODO LO QUE TENGO EN LA TABLA, CON SUS RESPECTIVOS CAMPOS-----
// knex
//   .from("mensajes")
//   // EL ASTERISCO ES PARA QUE ME DE TODOS LOS CAMPOS
//   .select("*")
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((e) => {
//     console.log(e);
//   })
//   .finally(() => {
//     knex.destroy();
//   });
