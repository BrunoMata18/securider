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
//app.post('/utilizador/login', users.login)
app.get('/utilizador/login', users.login)
app.post('/utilizador/registar', users.createutilizador)
app.post('/utilizador/delete/:id', users.userdelete)
app.post('/utilizador/updateuser/:id', users.updateuser)
app.post('/utilizador/criarTrilha', users.createtrilha)
app.get('/utilizador', users.getutilizador)
app.get('/utilizador/tipo', users.getutilizadortipo)
app.get('/utilizador/:id', users.getutilizadorId)
app.get('/utilizador/novidades', users.getnovidades)
app.get('/utilizador/loja/:id', users.getutilizadorLoja)
app.get('/utilizador/trilhas/repetir/:id', users.getutilizadorParaRepetir)
app.get('/utilizador/trilhas/minhasTrilhas/:id', users.getutilizadorMinhasTrilhas)
app.get('/utilizador/pontos/meusPontos/:id', users.getutilizadorPontos)
app.get('/utilizador/nome/:id', users.getutilizadorUsername)

//trilhas
const trilhas = require('./routes/trilha')
app.post('/trilha/delete/local/:id', trilhas.deleteTrilhaPlace)
app.post('/trilha/delete/trilhaAdquirida/:id', trilhas.createtrilhaadquirida)
app.post('/trilha/delete/favorito/:id', trilhas.deleteTrilhaFavorito)
app.post('/trilha/delete/like/:id', trilhas.deleteTrilhaLike)
app.post('/trilha/delete/report/:id', trilhas.deleteTrilhaReport)
app.post('/trilha/delete/:id', trilhas.deleteTrilha)
app.post('/trilha/update/completa', trilhas.updateTrilhaCompleta)
app.post('/trilha/create/like', trilhas.createtrilhalike)
app.post('/trilha/create/trilhaAdquirida', trilhas.createtrilhaadquirida)
app.post('/trilha/updateLocal', trilhas.getUpdatePossuiLocal)
app.post('/trilha/create/localTrilha', trilhas.createtrilhaplace)
app.post('/trilha/aprovarTrilha', trilhas.getUpdateTrilhaAprovacao)
app.get('/trilha/reports', trilhas.getreports)
app.get('/trilha/numeroReports/:id', trilhas.getNumberReportsTrilha)
app.get('/trilha/reportInfo/:id', trilhas.getReportInfo)
app.get('/trilha/trilhaIncompleta/:id', trilhas.getEditTrilha)
app.get('/trilha/trilhasAprovar', trilhas.getnotaprovedtrilhas)
app.get('/trilha/utilizador/completas/:id', trilhas.getnumerocompletasuser)



//embates
const embates = require('./routes/embates')
app.post('/embate/delete', embates.deleteEmbate)
app.post('/embate/criarEmbate', embates.createuserembate)
app.post('/embate/pontosTotais', embates.getUpdatePontosTotalUtilizador)
app.post('/embate/pontosSemanais', embates.getUpdatePontosSemanalUtilizador)
app.post('/embate/moedas', embates.getUpdateMoedasUtilizador)
app.post('/embate/resetPontosSemanais', embates.getResetPontosSemanalUtilizador)
app.get('/embate', embates.getembates)
app.post('/trilha/criarReport', embates.createreport)







module.exports = app;

