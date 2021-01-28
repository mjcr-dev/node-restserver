const express = require('express');
const Usuario = require('../models/usuario');

const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = express();

app.get('/usuario', (req, res) => {
    //res.json("get Usuario LOCAL");

    //con find sin comando devolvera todos los registros
    //podemos poner la consulta dentro
    //exec ejecuta y devuelve un callback con error o respuesta
    //limit limita el resultado y skip salta a los siguientes (para paginacion)
    //req.query devuelve parametro que pasemos por get ?=param
    let desde = Number(req.query.desde) || 0;
    let limite = Number(req.query.limite) || 5;
    //podemos pasar otro parametro a find para decirle que datos mostrar
    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: "Error al buscar usuarios",
                    err
                });
            } else {

                Usuario.count({ estado: true }, (err, total) => {
                    return res.json({
                        ok: true,
                        usuarios,
                        total
                    });
                });

            }
        });
});

app.post('/usuario', (req, res) => {

    //body ya parseado con body-parser
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        } else {

            //usuarioDB.password = null;

            res.json({
                ok: true,
                usuario: usuarioDB
            })
        }

    });

    //podemos crear distintos estados por si algo falla hacerlo saber
    //devuelve el estado 400 y un json
    /*if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }

    res.json({
        persona: body
    });*/
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    //con findByIdAndUpdate podemos encontrar un id y actualizar su contenido
    //la opcion new es para que retorne el nuevo resultado despues de actualizar
    //runValidators activo pasará antes de modificar por los validadores que tengamos

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        } else {

            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }

    });


});

app.delete('/usuario/:id', (req, res) => {
    //res.json("delete Usuario");

    let id = req.params.id;

    /*
    Podemos borrarlo fisicamente pero es mejor marcar el campo estado
    en false para seguir teniendo registro en la bd

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        } else if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                message: "Usuario no encontrado"
            })
        } else {
            res.json({
                ok: true,
                usuario: usuarioBorrado
            });
        }

    });
    */

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        } else if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                message: "Usuario no encontrado"
            })
        } else {
            return res.json({
                ok: true,
                usuario: usuarioBorrado
            });
        }
    });


});


module.exports = app;