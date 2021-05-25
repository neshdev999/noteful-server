require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const noteful = require('./noteful.json')
const notesRouter = require('../notes/notes-router')
const foldersRouter = require('../folders/folders-router')

const app = express();

const morganOption = (NODE_ENV === 'production') ?
    'tiny' :
    'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());





app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://noteful-app-psi-sage.vercel.app");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});


app.use('/api/notes', notesRouter)
app.use('/api/folders', foldersRouter)

app.get('/api', (req, res) => {
    res.send(noteful)
})

app.get('/', (req, res) => {
    res.send('Hello, Noteful!');
});

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
});

module.exports = app;