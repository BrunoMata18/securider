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
app.post('/utilizador/login', users.login) 

app.get('/utilizador/autenticate/:username', users.getusernamepassword)
/*
app.post('/utilizador/registar', users.createutilizador)
app.post('/utilizador/delete/:id', users.userdelete)
app.post('/utilizador/updateuser/:id', users.updateuser)
app.post('/utilizador/criarTrilha', users.createtrilha)
app.get('/utilizador', users.getutilizador)
app.get('/utilizador/2', users.getutilizador2)
app.get('/utilizador/3', users.getutilizador3)
app.get('/utilizador/tipo', users.getutilizadortipo)
app.get('/utilizador/:id', users.getutilizadorId)
app.get('/utilizador/4', users.getutilizador4)
app.get('/utilizador/loja/:id', users.getutilizadorLoja)
app.get('/utilizador/trilhas/repetir/:id', users.getutilizadorParaRepetir)
app.get('/utilizador/trilhas/minhasTrilhas/:id', users.getutilizadorMinhasTrilhas)
app.get('/utilizador/pontos/meusPontos/:id', users.getutilizadorPontos)
app.get('/utilizador/nome/:id', users.getutilizadorUsername)
app.get('/utilizador/5', users.getutilizador5)
*/
app.get('/utilizador/get/tipo', users.getutilizadortipo)
app.get('/utilizador/get/all', users.getutilizador)
app.post('/utilizador/registar', users.createutilizador)
app.get('/utilizador/get/leaderboard', users.getutilizador2)
app.get('/trilha/get/novidades', users.getnovidades)
app.get('/trilha/get/loja/:id', users.getloja)
app.get('/trilha/get/pararepetir/:id', users.getpararepetir)
app.get('/trilha/get/minhastrilhas/:id', users.getminhastrilhas)
app.get('/utilizador/get/allpontos/:id', users.getutilizadorpontos)
app.get('/utilizador/get/username/:id', users.getutilizadorusername)
app.get('/utilizador/get/:id', users.getutilizadorid)
app.post('/utilizador/delete/:id', users.userdelete)
app.get('/utilizador/get/allmoedas/:id', users.getutilizadormoedas)
//app.post('/utilizador/update/moedas/:id/:quantity', users.updateusermoedas)
app.put('/utilizador/update/moedas/:id/:quantity', users.updateusermoedas)
app.post('/utilizador/update/pontos/semanais/:id/:quantity', users.updateuserpontossemanais)
app.post('/utilizador/update/pontos/totais/:id/:quantity', users.updateuserpontostotais)
app.get('/utilizador/get/trilha/favoritos/:id', users.getutilizadorfavoritos)



///////// OBTER PREVIA DE NOVIDADES (NA HOMEPAGE) //////////

app.get('/trilha/get/previa/novidades', users.getnovidadesprevia)

//////// OBTER PREVIA DE LOJA ////////

app.get('/trilha/get/previa/loja/:id', users.getlojaprevia)

//////// OBTER PREVIA DE PARA REPETIR /////////

app.get('/trilha/get/previa/pararepetir/:id', users.getpararepetirprevia)

//////// OBTER PREVIA DE MINHAS TRILHAS /////////

app.get('/trilha/get/previa/minhastrilhas/:id', users.getminhastrilhasprevia)

//DEIXAR E REMOVER LIKE/

app.post('/utilizador/darlike', users.createtrilhalike)
app.delete('/utilizador/removerlike/:idtrilha/:idutilizador', users.userdeletelike)

/////OBTER DETALHES DA CONTA - NUMERO DE TRILHAS COMPLETAS/////

app.get('/utilizador/get/trilhas/completas/count/:id', users.getnumbercompletas)

///// ADQUIRIR UMA TRILHA /////

app.post('/utilizador/adquirir/trilha', users.createtrilhaadquirida)

////// ENVIAR REPORT PARA UMA TRILHA ///////

app.post('/utilizador/report/trilha', users.createtrilhareport)

////// MUDAR TIPOS DE UTILIZADOR (SE ALGUEM SE TORNAR MODERADOR/PREMIUM) ///////

app.put('/utilizador/update/user/type/:newtype/:id', users.updateusertype)

/////////////////////////////////QUERIES DE TRILHAS///////////////////////////////////

const trilhas = require('./routes/trilha')
app.get('/trilha/reports', trilhas.getreports)
app.get('/trilha/reports/getcount/:id', trilhas.getnumberreportstrilha)
app.get('/trilha/reports/getinfo/:id', trilhas.getreportinfo)
app.post('/trilha/delete/report/:id', trilhas.deletereport)


///////////// CRIAR UMA TRILHA \\\\\\\\\\\\\\

app.post('/trilha/create/trilha', trilhas.createtrilha)

//////////// MOSTRAR TRILHAS PARA APROVAR E O UPDATE DE APROVAÇÃO \\\\\\\\\\\\\

app.get('/trilha/get/aprovar', trilhas.getnotaprovedtrilhas)

app.put('/trilha/aprove/:id', trilhas.getupdatetrilhaaprovacao)

//////////// VERIFICAR SE UMA TRILHA JÁ É COMPLETA, USANGO UM GET \\\\\\\\\\\

app.get('/trilha/verify/trilha/completebyuser/:id/:trilhaid', trilhas.getcompleteverify)

////////////////// ADICIONAR LOCAL Á TRILHA ////////////////

app.post('/trilha/create/localtrilha', trilhas.createtrilhaplace)

////////////////// UPDATE DE POSSUIR LOCAL (APÓS ADICIONAR UM LOCAL A UMA TRILHA) \\\\\\\\\\\\\\\\\

app.put('/trilha/haveplace/:id', trilhas.getupdatetrilhahaveplace)

////////////////UPDATE PARA QUANDO UM UTILIZADOR COMPLETAR UMA TRILHA QUE JÁ FOI ADQUIRIDA //////////////////

app.post('/trilha/complete/:userid/:trilhaid', trilhas.updatetrilhacompleta)

/////////////// OBTER AS TRILHAS INCOMPLETAS (MENU PARA ADICIONAR LOCAIS) ////////////////

app.get('/trilha/get/incompleta/:id', trilhas.getedittrilha)

/////////////// OBTER OS DETALHES DA TRILHA /////////////////

app.get('/trilha/get/details/:id', trilhas.getdetailstrilha)

////////////////// CONTAR LIKES NUMA TRILHA /////////////////////

app.get('/trilha/get/details/numberlikes/:id', trilhas.getnumerolikestrilha)

/////////////////// VERIFICAÇÕES DA TRILHA ////////////////////

///////// 1. VERIFICAR SE O UTILIZADOR COMPROU A TRILHA EM QUE CLICOU (MOSTRAR (OU NÃO), O BOTÃO DE COMPRAR) /////////

app.get('/trilha/verify/adquirido/:idtrilha/:id', trilhas.getutilizadorcheckcompradotrilha)

///////// 2. VERIFICAR SE O UTILIZADOR DEIXOU LIKE (ALTERNAR OS BOTÕES DE DEIXAR/REMOVER LIKE) /////////

app.get('/trilha/verify/like/:idtrilha/:id', trilhas.getutilizadorcheckliketrilha)

///////// 3. VERIFICAR SE A TRILHA FOI CRIADA PELO UTILIZADOR QUE A ACEDE /////////

app.get('/trilha/verify/criado/:idtrilha/:id', trilhas.getutilizadorcriadotrilha)

///////////////// APAGAR UMA TRILHA - LOCAL /////////////////

app.delete('/trilha/delete/local/:id', trilhas.deletetrilhaplace)

///////////////// APAGAR UMA TRILHA - APAGAR AS TRILHA DAS ADQUIRIDAS DOS UTILIZADORES QUE A COMPRARAM ///////////////////--FEITO

app.delete('/trilha/delete/adquiridos/:id', trilhas.deletetrilhaadquirida)

///////////////// APAGAR UMA TRILHA - APAGAR AS TRILHA DOS FAVORITOS DOS UTILIZADORES QUE A COMPRARAM ///////////////////--FEITO

app.delete('/trilha/delete/favoritos/:id', trilhas.deletetrilhafavorito)

///////////////// APAGAR OS LIKES DA TRILHA - APAGAR AS TRILHA DOS FAVORITOS DOS UTILIZADORES QUE A COMPRARAM ///////////////////--FEITO

app.delete('/trilha/delete/like/:id', trilhas.deletetrilhalike)

///////////////// APAGAR OS REPORTS RELACIONADOS Á TRILHA //////////////////--FEITO

app.delete('/trilha/delete/reports/:id', trilhas.deletealltrilhareport)

///////////////// APAGAR A TRILHA /////////////////

app.delete('/trilha/delete/all/:id', trilhas.deletealltrilha)

////////////////// APAGAR UM FAVORITO ////////////////

app.post('/trilha/delete/favoritos/user/:userid/:id', trilhas.deletealltrilhafavorito)

////////////////////////// MÉTODOS DE EMBATES ///////////////////////////

//////////////// OBTER OS EMBATES ////////////////

const embates = require('./routes/embates')

app.get('/embate/get/all', embates.getembates)

app.post('/embate/create', embates.createuserembate)

app.delete('/embate/delete/:id', embates.deleteembate)

/*app.post('/embate/delete', embates.deleteEmbate)
app.post('/embate/criarEmbate', embates.createuserembate)
app.post('/embate/pontosTotais', embates.getUpdatePontosTotalUtilizador)
app.post('/embate/pontosSemanais', embates.getUpdatePontosSemanalUtilizador)
app.post('/embate/moedas', embates.getUpdateMoedasUtilizador)
app.post('/embate/resetPontosSemanais', embates.getResetPontosSemanalUtilizador)
app.get('/embate', embates.getembates) --------------------------------------------------
app.post('/trilha/criarReport', embates.createreport)

*/


/*trilhas
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

*/

module.exports = app;

