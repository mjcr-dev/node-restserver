require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());

app.get('/usuario', (req, res) => {
    res.json("get Usuario");
});

app.post('/usuario', (req, res) => {

    //body ya parseado con body-parser
    let body = req.body;

    //podemos crear distintos estados por si algo falla hacerlo saber
    //devuelve el estado 400 y un json
    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            mensaje: 'El nombre es necesario'
        });
    }

    res.json({
        persona: body
    });
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    res.json({
        id
    });
});

app.delete('/usuario', (req, res) => {
    res.json("delete Usuario");
});


app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
});