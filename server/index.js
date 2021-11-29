// index.js
// Nombre del host y del puerto
const host = 'localhost';
const port = 3000;

// Cargar módulo express
var express = require('express');
var app = express();

// Cargar módulo CORS
var cors = require('cors')
app.use(cors())


// Cargar módulo del middleware
var middleware = require('./middleware');

// Cargar servicio
var service = require('./service');

// Cargar módulo body-parser
var bodyParser = require('body-parser');

app.use(bodyParser.json());

// Cargar modulo mysql
var mysql = require('mysql');
// Configuración conexión BD
var conexionBD = mysql.createConnection({
    host: 'localhost',
    database: 'buyseye',
    user: 'adi',
    password: 'jksIjGn9QZM7bk2P'
});

// Conectarse a la BD antes especificada
conexionBD.connect((error) => {
    if (error) throw error;
    console.log('Conexión realizada con éxito con BD MySQL');
});

// login
app.post('/auth/login', (req, res) => {
    const userLog = req.body[0];
    const sql = 'SELECT * from usuarios WHERE usuarios.username = \'' + userLog.username + '\'';
    // consultamos en BD si existe el usuario y si el password es correcto
    conexionBD.query(sql, (error, results) => {
        if (error) {
            // error en la query
            res.status(500);
            res.end();
        } else {
            if (results.length < 1) {
                // NO existe usuario con ese username
                res.status(400);
                res.type('plain/text');
                res.send('No existe usuario.').end();
            } else {
                // usuario existe
                if (userLog.password != results[0].password) {
                    // Contraseña incorrecta
                    res.status(400);
                    res.type('plain/text');
                    res.send('Contraseña incorrecta.').end();
                } else {
                    // Credenciales válidas
                    res.status(200);
                    res.send({ token: service.createToken(userLog.username) });
                    res.end();
                }
            }
        }
    });
});

app.route('/api/usuarios')
    .get((req, res) => {
        const sql = 'SELECT id, username, email, nombre, apellidos, fecha_nacimiento, direccion FROM usuarios';
        conexionBD.query(sql, (error, results) => {
            if (error) {
                res.status(500);
                res.send(error).end();
            } else {
                // todo ha funcionado correctamente
                res.status(200);
                res.json(results).end();
            }
        });
    })
    .post((req, res) => {
        var nuevoUser = req.body[0];
        const sql = 'INSERT INTO usuarios (username, email, nombre, apellidos, fecha_nacimiento, direccion, password) VALUES (' +
            '\'' + nuevoUser.username + '\', ' +
            '\'' + nuevoUser.email + '\', ' +
            '\'' + nuevoUser.nombre + '\', ' +
            '\'' + nuevoUser.apellidos + '\', ' +
            '\'' + nuevoUser.fecha_nacimiento + '\', ' +
            '\'' + nuevoUser.direccion + '\', ' +
            '\'' + nuevoUser.password + '\')';
        // realizamos la query
        conexionBD.query(sql, (error, results) => {
            if (error) {
                // Algún campo no válido
                res.status(400);
                res.send(error).end();
            } else {
                // Necesitamos id para localizar usuario
                const sql1 = 'SELECT id from usuarios WHERE usuarios.email = \'' + nuevoUser.email + '\'';
                conexionBD.query(sql1, (error, results) => {
                    if (error) {
                        res.status(500);
                        res.send(error).end();
                    } else {
                        // se ha creado el usuario y se envía localización del mismo en la caecera
                        res.status(201);
                        res.location(host + ':' + port + '/api/usuarios/' + results[0].id).end();
                    }
                });
            }
        });
    });

app.route('/api/usuarios/:username')
    .get((req, res) => {
        const sql = 'SELECT id, username, email, nombre, apellidos, fecha_nacimiento, direccion from usuarios WHERE usuarios.username = \'' + req.params.username + '\'';
        // realizamos la consulta
        conexionBD.query(sql, (error, results) => {
            if (error) {
                // no existe el recurso en BD
                res.status(500);
                res.send(error).end();
            } else {
                // Comprobar que la consulta ha devuelto un usuario
                if (results.length < 1) {
                    // No ha dado resultado la búsqueda: el usuario no existe en BD
                    res.status(404);
                    res.send("Usuario " + req.params.username + " no existe!!!").end();
                } else {
                    // todo ha ido correctamente
                    res.status(200);
                    res.type('application/json');
                    res.send(results[0]).end();
                }
            }
        });
    })
    .delete(middleware.yaHaSidoAutetificado, (req, res) => {
        // FALTA COMPROBAR CREDENCIALES (401)
        // NO TENER PERMISO SI NO ES EL PROPIO USUARIO (403)
        if (req.username == req.params.username) {
            const sql = 'DELETE FROM usuarios WHERE usuarios.username = \'' + req.params.username + '\'';
            conexionBD.query(sql, (error) => {
                if (error) {
                    // no existe el recurso en BD
                    res.status(404);
                    res.send(error).end();
                } else {
                    // se ha eliminado el producto con éxito
                    res.status(201);
                    res.send({ emssage: "Se ha eliminado el producto correctamente." }).end();
                }
            });
        } else {
            // No es el propio usuario el que se elimina
            res.status(403);
            res.send({ message: "No tienes permiso para elminar una cuenta ajena." }).end();
        }
    });

app.route('/api/productos/:id')
    .get((req, res) => {
        const sql = 'SELECT * FROM productos WHERE productos.id = ' + req.params.id;
        // realizamos la consulta
        conexionBD.query(sql, (error, results) => {
            if (error) {
                // no existe el recurso en BD
                res.status(404);
                res.send(error).end();
            } else {
                if (results.length < 1) {
                    // no existe el recurso en BD
                    res.status(404);
                    res.send(error).end();
                } else {
                    // todo ha ido correctamente
                    let producto = {
                        id: results[0].id,
                        nombre: results[0].nombre,
                        descripcion: results[0].descripcion,
                        precio: results[0].precio,
                        vendido: results[0].vendido
                    };
                    // Buscamos el usuario que ha subido el producto y cogemos su info excepto la contraseña
                    const sql1 = 'SELECT id, username, email, nombre, apellidos, direccion, fecha_nacimiento FROM usuarios WHERE usuarios.id = ' + results[0].usuario_id;
                    conexionBD.query(sql, (error, results) => {
                        if (error) {
                            res.status(500);
                            res.send(error).end();
                        } else {
                            producto.usuario = results[0];
                            res.status(200);
                            res.type('application/json');
                            res.send(producto).end();
                        }
                    });
                }
            }
        });
    })
    .put(middleware.yaHaSidoAutetificado, (req, res) => {
        var productoActualizado = req.body[0];
        const sql = 'UPDATE productos ' +
            ' SET productos.nombre = \'' + productoActualizado.nombre + '\', ' +
            'productos.descripcion = \'' + productoActualizado.descripcion + '\', ' +
            'productos.precio = ' + productoActualizado.precio + ', ' +
            'productos.vendido = ' + productoActualizado.vendido + ' ' +
            'WHERE productos.id = ' + req.params.id;
        conexionBD.query(sql, (error) => {
            if (error) {
                // No existe el producto en la BD
                res.status(404);
                res.send(error).end();
            } else {
                // resultado correcto
                // query para obtener todos lo datos
                conexionBD.query('SELECT * FROM productos WHERE productos.id = ' + req.params.id, (error, results, fields) => {
                    var resultado = {
                        id: results[0].id,
                        nombre: results[0].nombre,
                        descripcion: results[0].descripcion,
                        precio: results[0].precio,
                        vendido: results[0].vendido
                    };
                    var usuarioProducto = results[0].usuario_id;
                    conexionBD.query('SELECT id, username, email, nombre, apellidos, direccion, fecha_nacimiento FROM usuarios WHERE usuarios.id = ' + usuarioProducto,
                        (error, results, fields) => {
                            resultado.usuario = results[0];
                            // mandamos respuesta http
                            res.status(201);
                            res.type('application/json');
                            res.send(resultado).end();
                            console.log("USUARIO ACTUALIZADO!");
                        });
                });
            }
        });
    })
    // FALTA COMPROBAR CREDENCIALES
    .delete(middleware.yaHaSidoAutetificado, (req, res) => {
        conexionBD.query('DELETE FROM productos WHERE productos.id = ' + req.params.id,
            (error) => {
                if (error) {
                    // no existe el recurso en BD
                    res.status(404);
                    res.send(error).end();
                } else {
                    // se ha eliminado el producto con éxito
                    res.status(201);
                    res.send("Se ha eliminado el producto correctamente.").end();
                }
            }
        );
    });

// Página bienvenida API
app.get('/', (req, res) => {
    res.status(200);
    res.contentType('HTML');
    res.send("<h2>Bienvenido a la API de BUYSEYE!</h2>").end();
});

// Mantener el servidor a la escucha
app.listen(port, host, () => {
    console.log("Server is running on http://" + host + ":" + port);
});

// Pillar las demás consultas
app.get('*', (req, res) => {
    console.log(req.url + ' no existe');
    res.redirect(301, 'http://' + host + ':' + port + '/');
});