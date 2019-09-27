const express = require("express");
const bodyParser = require('body-parser');
const app = express(); app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json()); let test = {
    numeros: ''
};
let respuesta = {
    codigo: '',
    errors: '',
    data:{
        suma:'',
        resta:'',
        multiplicacion:'',
        division:''
    }
};

app.post('/test', function (req, res) {
    

    if (!Array.isArray(req.body.numeros)) {
        respuesta = {
            codigo: 422,
            errors: 'invalid_data_format',
            data:{
            }
        };
    } else {
        var sum, rest, mult, div;
        var arr = req.body.numeros;
        
        const sumNum = (accumulator, currentValue) => accumulator + currentValue;
        sum=arr.reduce(sumNum);

        const resNum = (accumulator, currentValue) => accumulator - currentValue;
        rest = arr.reduce(resNum);

        const multNum = (accumulator, currentValue) => accumulator * currentValue;
        mult = arr.reduce(multNum);

        const divtNum = (accumulator, currentValue) => accumulator / currentValue;
        div = arr.reduce(divtNum);

        respuesta = {
            codigo: 200,
            errors: '',
            data:{
                suma : sum,
                resta : rest,
                multiplicacion : mult,
                division : div
            }
        }

    }

    res.send(respuesta);
});
app.use(function (req, res, next) {
    respuesta = {
        codigo: 500,
        errors: 'internal_server_error'
    };
    res.status(500).send(respuesta);
});

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});