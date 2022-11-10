const express = require("express");
const app = express();
const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("productos");
const PORT = process.env.PORT || 8081;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("form");
});

app.get("/productos", async (req, res) => {
  const productos = await contenedor.getAll();
  res.render("productsList", { productos, productsExist: true });
});

app.post("/", (req, res) => {
  const { body } = req;
  contenedor.save(body);
  console.log(body);
  res.redirect("/productos");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
