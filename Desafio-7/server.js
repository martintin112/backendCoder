const express = require("express");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const { engine } = require("express-handlebars");
const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("productos");
const ContenedorMsg = require("./contenedorMsg");
const contenedorMsg = new ContenedorMsg("mensajes");

const moment = require("moment");
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

// app.get("/", async (req, res) => {
//   res.sendFile("index.html", { root: __dirname });
// });

app.get("/", async (req, res) => {
  res.render("products");
});

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
  socket.emit("product-list", await contenedor.getAll());
  socket.emit("msg-list", await contenedorMsg.getAll());

  socket.on("producto", async (data) => {
    await contenedor.save(data);
    console.log("Nuevo producto agregado", "producto: ", data);
    io.emit("product-list", await contenedor.getAll());
  });

  socket.on("msg", async (data) => {
    await contenedorMsg.save({
      socketid: socket.id,
      fecha: formatoTiempo,
      ...data,
    });
    io.emit("msg-list", await contenedorMsg.getAll());
  });
});

httpServer.listen(process.env.PORT || 8080, () =>
  console.log(`http://localhost:${process.env.PORT || 8080}`)
);
