const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');





const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//utilizador
const users = require('./routes/user')
app.get('/utilizador',users.getutilizador)
app.post('/login',users.login)
app.post('/registar',users.createutilizador)
app.post('/delete',users.userdelete)
app.post('/updateuser',users.updateuser)
app.get('/utilizador/tipo', users.getutilizadortipo)
app.get('/utilizador/:id', users.getutilizadorId);









module.exports = app;

