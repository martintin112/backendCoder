Para ver los loggers tener el script start del package.json como "nodemon server.js"

<!-- ------------- -->

Para ver el procesamiento del servidor se cambio el npm start a "nodemon --prof server.js"
y luego se utilizo el comando artillery quick --count 50 -n 20 "http://localhost:8080/info" > artilleryResult.txt en consola
para obtener el resultado del proceso con artillery, en el caso de que lo queramos sin console logs, ir al archivo ruta y comentar
la linea donde esta hecho el logger.info("path: /info , Method: GET"); y realizar el paso anterior nuevamente
pero cambiando el archivo a artilleryResultSinCl.txt
