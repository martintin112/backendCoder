Para ver los loggers tener el script start del package.json como "nodemon server.js", los warn y error estaran en los archivos correspondientes con su mismo nombre.

<!-- ------------- -->

Para ver el procesamiento del servidor se cambio el npm start a "nodemon --prof server.js"
y luego se utilizo el comando artillery quick --count 50 -n 20 "http://localhost:8080/info" > artilleryResult.txt en consola
para obtener el resultado del proceso con artillery, en el caso de que lo queramos sin console logs, ir al archivo ruta y comentar
la linea donde esta hecho el logger.info("path: /info , Method: GET"); y realizar el paso anterior nuevamente
pero cambiando el archivo a artilleryResultSinCl.txt

Para realizar una prueba con autocannon se creo el archivo benchmark.js con la configuracion necesaria, luego en el package.json
se debe cambiar los scrips start por "0x server.js" y test por "node benchmark.js" y correrlos en terminales, una vez que termine nos creara una carpeta .0x con toda la informacion necesaria del performance, en este proyecto se puede encontrar la carpeta 24244.0x con dicha informacion, O realizar una nueva prueba si asi lo desea.
