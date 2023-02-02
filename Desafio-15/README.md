para iniciar los clusters en los puertos necesarios colocar en consola:

pm2 start server.js --name="Server1" --watch -i 3 -- -- 8082
pm2 start server.js --name="Server2" --watch -i 3 -- -- 8083
pm2 start server.js --name="Server3" --watch -i 3 -- -- 8084
pm2 start server.js --name="Server4" --watch -i 3 -- -- 8085

Asi tendremos clusters equitativos para cada uno de los puertos.

Luego vamos donde esta el archivo nginx.exe, abrimos una terminal y tipeamos ./nginx.exe

luego ir a /api/randoms y deberian abrirse con sus respectivos servidores
