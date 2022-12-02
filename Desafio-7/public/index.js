const socket = io();
// const moment = require("moment");
// const formatoTiempo = moment().format("h:mm a");

socket.on("connect", () => {
  console.log("me conecte!");
});

const msgEnviado = () => {
  const enviarMSg = document.getElementById("input-msg").value;
  const email = document.getElementById("input-email").value;
  socket.emit("msg", { email: email, mensaje: enviarMSg });
  return false;
};

socket.on("msg-list", (data) => {
  let html = "";
  data.forEach((element) => {
    html += `
      <div style="display:flex;">
      <p style="color:blue;">${element.email}</p> <p>[</p><p style="color:red;">${element.fecha}</p><p>]:</p> <p style="color:green;">${element.mensaje}</p>
     </div>`;
  });
  document.getElementById("msg-listado").innerHTML = html;
});

function postProducto() {
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const imagen = document.getElementById("imagen").value;
  socket.emit("producto", { nombre: nombre, precio: precio, imagen: imagen });
  return false;
}

socket.on("product-list", (data) => {
  let html = "";
  data.forEach((item) => {
    html += `
        <tr>
            <th scope="row">${item.id_producto}</th>
            <td>${item.nombre}</td>
            <td>${item.precio}</td>
            <td><img  src="${item.imagen}" alt="${item.nombre}" style="width: 80px;"/><td>
        </tr>
        `;
  });
  document.getElementById("productosContenedor").innerHTML = html;
});
