//archivo de configuración global para utilizar variables en fase de desarrollo y en producción

//====================
//  Puerto
// ===================
//Si no hay definido un env.port se utilizará el 3000 (desarrollo)
process.env.PORT = process.env.PORT || 3000;

//====================
//  Entorno
// ===================
//si env.NODE_ENV no existe se almacenará 'dev' y podremos saber cuando está en desarrollo o producción
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//====================
//  Base de datos
// ===================
//haremos una condición utilizando el env.NODE_ENV anterior para ver si estamos en desarrollo ponemos la conexión local y si estamos en producción la conexión hacia la bd en mongodb atlas
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://strider:fyAj2cMmHfKtp2UZ@cluster0.gzugy.mongodb.net/cafe';
}

process.env.URLDB = urlDB;