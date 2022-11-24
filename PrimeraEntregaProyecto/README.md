Esta entrega se pone a prueba mediante postman.
--//GET PRODUCTOS//--
seccion productos: /api/productos (get)
--//GET PRODUCTO POR ID//--
Obtener productos por su id: se debe escribir el endpoint /api/productos/id, ej: /api/productos/2
--// POSTEAR PRODUCTO//--
Para postear un producto se debe escribir el endpoint /api/productos y en postman se debe escribir una estructura como el siguiente ejemplo:
{
"nombre": "iphone 13 PRO00000",
"descripcion": "Es un buen celular",
"codigo": "001",
"imagen": "https://i.postimg.cc/65sWPwd3/iphone13.jpg",
"precio": 350000,
"stock": 1011111
}
--// MODIFICAR PRODUCTO POR ID//--
Para modificar un producto segun su id se debe escribir el endpoint /api/productos/id, ej /api/productos/2
Luego en el postman utilizar la misma estructura que cuando posteamos un producto, modificando lo que se desee.
--// BORRAR UN PRODUCTO SEGUN ID//--
Para borrar un producto debemos ir al endpoint /api/productos/id, ej /api/productos/2
En el postman seleccionar la opcion "del" y no es necesario agregar mas data que la url.

--//POSTEAR UN CARRITO//--
Debemos ir a /api/carrito, en el postman seleccionar la opcion "post" y listo, un carrito deberia haberse creado en carrito.json, con su respectivo id.
--//BORRAR UN CARRITO POR ID//--
Debemos ir a /api/carrito/id, por ejemplo /api/carrito/1 , luego en el postman seleccionar la opcion "del" y enviar. El carrito deberia haberse eliminado.
--//GET LISTA PRODUCTOS EN UN CARRITO//--
Para ver que productos tenemos en un carrito debemos ir a /api/carrito/id/productos , en id debemos seleccionar el id del carrito al cual queremos ver sus productos, ejemplo /api/carrito/1/productos , luego enviamos el pedido y postman nos mostrara un json con el listado, o que no hay productos en caso de no poseer.
--//POSTEAR PRODUCTOS EN UN CARRITO SEGUN ID DEL PRODUCTO//--
Para agregar un producto que ya tenemos en el archivo productos.json, debemos ir a /api/carrito/id/productos/id_prod , donde id es el del carrito e id_prod es el del producto a agregar, por ejemplo: /api/carrito/1/productos/2 , luego enviamos y se deberia haber agregado el producto a nuestro carrito.
--//BORRAR UN PRODUCTO DEL CARRITO//--
Para borrar un producto del carrito seleccionaremos la opcion "del" de postman y luego al igual que para postear productos debemos acceder al id del carrito y del producto, por ejemplo: /api/carrito/1/productos/2 , enviamos y el producto que poseia el id que ingresamos deberia haberse eliminado.
