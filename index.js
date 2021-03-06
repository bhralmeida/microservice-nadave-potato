'use strict';

const express       = require('express');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');
const helmet 	    = require('helmet');
const cors	        = require('cors');

const PORT              = process.env.PORT || 9000;
const MICROSERVICE_NAME = 'integrator';

const app = express();

const axios = require('axios');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.get('/healthcheck', (req, res) => {
    res.json({status: 200});
});

app.get('/integration', (req, res) => {
    getPerson()
        .then(person => {
            console.log('deu certo Person')
            res.json(person);
        })
        .catch(err => {
            console.log('deu erro Person')
            res.json(err);
        })
    getCripto()
        .then(cripto => {
            console.log('deu certo Cripto')
            res.json(cripto);
        })
        .catch(err => {
            console.log('deu erro Cripto')
            res.json(err);
        })
})

app.listen(PORT, err => {
    if (err) throw err;
    console.log('%s listening at 0.0.0.0:%s', MICROSERVICE_NAME, PORT);
});


const getPerson = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://demo-alb-993073808.us-east-1.elb.amazonaws.com/faker')
        .then(person => {
            console.log('terminou o request com sucesso')
            resolve(person.data);
        })
        .catch(err => {
            console.log('terminou o request com erro')
            console.log(err)
            reject(err);
        })
    });
}
const getCripto = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://demo-alb-993073808.us-east-1.elb.amazonaws.com/hasher/sha1/cobrinha')
        .then(cripto => {
            console.log('terminou o request com sucesso Cripto')
            resolve(cripto.data);
        })
        .catch(err => {
            console.log('terminou o request com erro Cripto')
            console.log(err)
            reject(err);
        })
    });
}