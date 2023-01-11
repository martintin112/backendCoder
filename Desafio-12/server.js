const express = require("express");
const session = require("express-session");
const app = express();
const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer);
const { engine } = require("express-handlebars");
const generadorFaker = require("./generadorFaker.js");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
let Mensajes = require("./schemaMongo/modeloMsg.js");
const auth = require("./middlewares/auth.js");

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
connectMG();
console.log("conectado a mongo!!!");

// RUTAS
app.get("/", async (req, res) => {
  res.render("products");
});

io.on("connection", async (socket) => {
  console.log(`Nuevo cliente conectado ${socket.id}`);
  socket.emit("product-list", await generadorFaker(5));
  socket.emit("msg-list", await Mensajes.find());

  socket.on("msg", async (data) => {
    const mensaje = new Mensajes({ fecha: formatoTiempo, ...data });
    console.log(mensaje);
    await mensaje.save();
    io.emit("msg-list", await Mensajes.find());
  });
});

// LOGIN Y SESIONES
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://adminMongo:xEc6zVRNPpllcARS@cluster0.cpkoy5i.mongodb.net/login",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: { maxAge: 60000 * 10 },

    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
// INICIAR SESION
app.post("/login", async (req, res) => {
  const { body } = req;

  if (!body.usuario || !body.constraseña) {
    return res.render("loginFail");
  }

  req.session.user = body.usuario;
  req.session.admin = true;
  console.log("inicio de sesion correcto, usuario:" + body.usuario);
  res.render("logueado", { layout: "logueo", usuario: req.session.user });
});

app.get("/login", (req, res) => {
  res.render("login", { layout: "logueo" });
});

// DESLOGUEARSE
app.get("/logout", (req, res) => {
  // const userInfo = [];
  // if (userInfo.length === 0) {
  //   userInfo.push(req.session.user);
  // }
  const user = req.session.user;
  req.session.destroy((err) => {
    if (err) {
      res.send("no pudo deslogear");
    } else {
      res.render("logout", { usuario: user });
    }
  });
});

// SHOWSESSION
app.get("/showsession", (req, res) => {
  const infoSesion = JSON.stringify(req.session, null, 4);

  res.render("session", { layout: "logueo", session: infoSesion });
});

// INFOPRIVADA
app.get("/informacionconfidencial", auth, (req, res) => {
  res.render("privado", {
    layout: "logueo",
    usuario: req.session.user,
    admin: req.session.admin,
  });
});

httpServer.listen(process.env.PORT || 8080, () =>
  console.log(`http://localhost:${process.env.PORT || 8080}`)
);
