## Servidor REST básico
#### Curso node.js
Peticiones GET, POST, PUT, DELETE
```
npm install
```

Server express. Conexión con base de datos mongoDB con mongoose (conexión distinta para desarrollo y producción)
Parseo del body que obtenemos del POST utilizando body-parser\
-Obtención de usuarios con paginación y conteo de registros (skip / limit / count) - GET\
-Inserción de nuevos usuarios (nombre, email, password[encriptación bcrypt] y rol)\
-Actualización de registros - PUT\
-Borrado de usuarios (cambiando estado) - DELETE

_Módulos utilizados: express, mongoose, mongoose-unique-validator, bcrypt, underscore, body-parser_