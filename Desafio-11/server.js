import express from "express";
const app = express();
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);
import { engine } from "express-handlebars";
import generadorFaker from "./generadorFaker.js";
import { mongoose, model, Schema } from "mongoose";
import { Mensajes } from "./schemaMongo/modeloMsg.js";
// // CONTENEDORES
// import { ContenedorMsgs } from "./contenedores/contenedorMsgs.js";
// const contenedorMsgs = new ContenedorMsgs();
// NORMALIZR
import { normalize, schema } from "normalizr";
// ME PERMITE USAR HANDLEBARS COMPATIBLE CON TYPE:MODULE
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import moment from "moment";
const formatoTiempo = moment().format("DD MM YYYY hh:mm ss a");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "hbs");
app.set("views", "./views");
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultlayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
  })
);
// CONECCION A MONGO
async function connectMG() {
  try {
    await mongoose.connect(
      "mongodb+srv://adminMongo:xEc6zVRNPpllcARS@cluster0.cpkoy5i.mongodb.net/?retryWrites=true&w=majority",
      { useNewUrlParser: true }
    );
  } catch (e) {
    console.log(e);
    throw "can not connect to the db";
  }
}
await connectMG();
console.log("conectado a mongo!!!");

// RUTAS
app.get("/", async (req, res) => {
  res.render("products");
});

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
  socket.emit("product-list", await generadorFaker(5));
  // socket.emit("msg-list", await contenedorMsgs.getAll());

  socket.on("msg", async (data) => {
    // await contenedorMsgs.save({
    //   fecha: formatoTiempo,
    //   ...data,
    // });
    const mensaje = new Mensajes({ fecha: formatoTiempo, ...data });
    console.log(mensaje);
    await mensaje.save();
    // const arrayMsgs = await Mensajes.find();
    // const msgsJson = JSON.stringify(arrayMsgs);
    // const msgsJsonConId = { id: 1, ...msgsJson };
    // NORMALIZE
    const autores = new schema.Entity("autores", {}, { idAttribute: "id" });
    const postSchema = new schema.Entity("msgs", {
      autor: autores,
    });
    const chat = new schema.Entity("chats", {
      msgs: [postSchema],
    });
    const normalizarData = (data) => {
      const normalizedMsgs = normalize({ id: "historial", msgs: data }, chat);
      return normalizedMsgs;
    };
    const normalizado = async () => {
      const listaMsgs = await Mensajes.find();
      const normalizarMsgs = normalizarData(listaMsgs);
      return normalizarMsgs;
    };
    io.emit("msg-list", await normalizado);
    console.log(JSON.stringify(normalizado));
  });
});

httpServer.listen(process.env.PORT || 8080, () =>
  console.log(`http://localhost:${process.env.PORT || 8080}`)
);
