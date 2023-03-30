const express = require('express')
const app = express()
const client = require('../models/connection')
//const client_envio = require('../models/recepcaonabd')
const client_envio = require('../models/connection')
const bcrypt = require('bcrypt');

const {compileTrust} = require("express/lib/utils");

////A OBTER OS EMBATES OCORRIDOS POR ORDEM DECRESCENTE DE OCORRÊNCIA (A LOCALIZAÇÃO É ENVIADA PELO ESP32 QUANDO DETETA UMA COLISÃO E AO FIM DE 30 SEGUNDOS NÃO É DETETADA NENHUMA RESPOSTA DO ALARME PELA PESSOA)


const getembates = (req,res)=>{
    try {
    client.query('SELECT e.embate_id, e.embate_local, e.embate_data FROM embate e ORDER BY e.embate_data DESC',(error,results)=>{
      if(error)
      {
        throw error
      }
      res.status(200).json(results)
    })
  }
  catch (e) {
    console.log(e);
    response.status(200).json("error")
  }
  finally {
    console.log("success");
  }
  }

////////////////////////////// APAGAR UM EMBATE PELO ID //////////////////////////////

const deleteEmbate = (req, res) => {
    const embateId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('DELETE FROM embate WHERE embate_id = ?', [embateId], (error, results) => {
        if(error)
        {
          throw error
        }
        res.status(200).json(results)
      });
    } catch (e) {
      console.log(e);
      res.status(500).json("Erro ao obter o usuário");
    } finally {
      console.log("Sucesso!");
    }
  };


////////////////////////////// MÉTODOS QUE FALTAM //////////////////////////////////

/*

Sendo que, a dificuldade terá que ir ainda vazia, assim como o seu estado de aprovação (a 0) e o de possuir local a 0 também.

iamnotbeluga — 03/04/2023 10:40 PM

OBTER INFORMAÇÕES BÁSICAS DE UM UTILIZADOR:

SELECT utilizador_nome AS username, utilizador_email AS email, utilizador_telemovel AS telemovel, utilizador_moedas AS "numero de moedas"
FROM utilizador
WHERE utilizador_id = {id};


Reset de pontos semanais para todos os utilizadores:

UPDATE utilizador SET utilizador_pontos_semanais = 0;
iamnotbeluga — 03/04/2023 11:07 PM
UPDATE aos pontos semanais e pontos totais de um utilizador com um x ID , para por exemplo, depois de ter concluido uma trilha obter os pontos da mesma e  guardar

UPDATE utilizador 
SET utilizador_pontos_semanais = quantidade_nova,
    utilizador_pontos_totais = quantidade_nova
WHERE utilizador_id = {id_do_utilizador};
VERSÃO CORRETA (a quantidade de moedas é a mesma de pontos)

UPDATE utilizador
SET pontos_semanais = quantidade_nova,
    pontos_totais = quantidade_nova,
    moedas = quantidade_nova
WHERE utilizador_id = {utilizador_id};*/

/*CRIAR UM EMBATE (POIS QUANDO UMA COLISÃO É DETETADA E O UTILIZADOR ENCONTRA-SE INANIMADO, É ENVIADO UM EMBATE)*/

const createuserembate = (request, response) => {
    try {
      const trilha = request.body;
  
      console.log(trilha);
    
      const query = 'INSERT INTO embate (embate_local, embate_data, embate_local_latitude, embate_local_longitude) VALUES (ST_GeomFromText("POINT(' + trilha.embate_local_longitude + ' ' + trilha.embate_local_latitude + ')"), NOW() ,' + trilha.embate_local_latitude + ', ' + trilha.embate_local_longitude + ')';

      console.log(query);
  
      client_envio.query(query, (error, results) => {
        if (error) {
          throw error;
        }
  
        response.status(201).send("Trilha added with ID: " + results.insertId);
      });
    } catch (e) {
      console.log(e);
      response.status(500).json({ error: e.message });
    } finally {
      console.log("success");
    }
  };
  
  


/*GANHO DE PONTOS PARA O UTILIZADOR (A NIVEL TOTAL)*/

const getUpdatePontosTotalUtilizador = (req, res) => {
    const utilizadorId = req.params.id; // obtém o ID do usuário a partir da URL
    const novosPontos = req.body.pontos; // obtém os novos pontos a partir do corpo da solicitação

    try {
      client.query('UPDATE users SET utilizador_pontos_totais = ? WHERE utilizador_id = ?', [novosPontos, utilizadorId], (error, results) => {
        if(error)
        {
          throw error
        }
        res.status(200).json(results)
      });
    } catch (e) {
      console.log(e);
      res.status(500).json("Erro ao atualizar pontos do usuário");
    } finally {
      console.log("Sucesso!");
    }
};


/*GANHO DE PONTOS PARA O UTILIZADOR (A NIVEL SEMANAL)*/

const getUpdatePontosSemanalUtilizador = (req, res) => {
    const utilizadorId = req.params.id; // obtém o ID do usuário a partir da URL
    const novosPontos = req.body.pontos; // obtém os novos pontos a partir do corpo da solicitação

    try {
      client.query('UPDATE users SET utilizador_pontos_sem = ? WHERE utilizador_id = ?', [novosPontos, utilizadorId], (error, results) => {
        if(error)
        {
          throw error
        }
        res.status(200).json(results)
      });
    } catch (e) {
      console.log(e);
      res.status(500).json("Erro ao atualizar pontos do usuário");
    } finally {
      console.log("Sucesso!");
    }
};


/*GANHO/PERDA DE MOEDAS PARA O UTILIZADOR*/

const getUpdateMoedasUtilizador = (req, res) => {
    const utilizadorId = req.params.id; // obtém o ID do usuário a partir da URL
    const novosMoedas = req.body.moedas; // obtém os novos pontos a partir do corpo da solicitação

    try {
      client.query('UPDATE users SET utilizador_moedas = ? WHERE utilizador_id = ?', [novosMoedas, utilizadorId], (error, results) => {
        if(error)
        {
          throw error
        }
        res.status(200).json(results)
      });
    } catch (e) {
      console.log(e);
      res.status(500).json("Erro ao atualizar pontos do usuário");
    } finally {
      console.log("Sucesso!");
    }
};

/*RESET DE PONTOS (APLICADO SEMANALMENTE)*/

const getResetPontosSemanalUtilizador = (req, res) => {

    try {
      client.query('UPDATE users SET utilizador_pontos_sem = 0', (error, results) => {
        if(error)
        {
          throw error
        }
        res.status(200).json(results)
      });
    } catch (e) {
      console.log(e);
      res.status(500).json("Erro ao atualizar pontos do usuário");
    } finally {
      console.log("Sucesso!");
    }
};

/*CRIAR REPORT - TERMINAR*/

const createreport = (request, response) => {
  try {
    const report = request.body;

    console.log(report);
  
    /*TERMINAR*/
    const query = 'INSERT INTO report (embate_local, embate_data, embate_local_latitude, embate_local_longitude) VALUES ("'+ trilha_completada + '", "'+ trilha.trilha_adquirida_uti_id.toString() +'", "'+ trilha.trilha_adquirida_trilha_id.toString() + '")';

    console.log(query);

    client_envio.query(query, (error, results) => {
      if (error) {
        throw error;
      }

      response.status(201).send("Trilha added with ID: " + results.insertId);
    });
  } catch (e) {
    console.log(e);
    response.status(500).json({ error: e.message });
  } finally {
    console.log("success");
  }
};

module.exports = {
    getembates,
    deleteEmbate,
    createuserembate,
    getUpdatePontosTotalUtilizador,
    getUpdatePontosSemanalUtilizador,
    getUpdateMoedasUtilizador,
    getResetPontosSemanalUtilizador,
    createreport
  }
