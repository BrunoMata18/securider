const express = require('express')
const app = express()
const client = require('../models/connection')
//const client_envio = require('../models/recepcaonabd')
const client_envio = require('../models/connection')
const bcrypt = require('bcrypt');

const {compileTrust} = require("express/lib/utils");

/////////////// APAGAR TRILHA ////////////////

const deleteTrilhaPlace = (req, res) => {
    const trilhaId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('DELETE FROM trilha_place WHERE trilha_identifier = ?', [trilhaId], (error, results) => {
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

  const deleteTrilhaAdquirida = (req, res) => {
    const trilhaId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('DELETE FROM trilha_adquirida WHERE trilha_adquirida_trilha_id = ?', [trilhaId], (error, results) => {
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

  const deleteTrilhaFavorito = (req, res) => {
    const trilhaId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('DELETE FROM trilha_favorito WHERE trilha_favorito_trilha_id = ?', [trilhaId], (error, results) => {
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

  const deleteTrilhaLike = (req, res) => {
    const trilhaId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('DELETE FROM trilha_like WHERE trilha_like_trilha_id = ?', [trilhaId], (error, results) => {
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

  
  const deleteTrilhaReport = (req, res) => {
    const trilhaId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('DELETE FROM trilha_report WHERE trilha_identifier = ?', [trilhaId], (error, results) => {
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


  const deleteTrilha = (req, res) => {
    const trilhaId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('DELETE FROM trilha WHERE trilha_id = ?', [trilhaId], (error, results) => {
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

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  const updateTrilhaCompleta = (req, res) => {
    const trilhaId = req.params.trilha_id; // obtém o ID do usuário a partir da URL
    const userId = req.params.user_id;
  
    try {
      client.query('UPDATE trilha_adquirida SET trilha_completada = true WHERE trilha_id = ?' + ' AND utilizador_id = ?', [trilhaId, userId], (error, results) => {
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


  ////////////////////////// LIKE DA TRILHA /////////////////////////////


  const createtrilhalike = (request, response) => {
    try {
      const trilha = request.body


      console.log(trilha)
      const query = 'INSERT INTO trilha_favorito (trilha_favorito_uti_id, trilha_favorito_trilha_id) VALUES ("'+ trilha.trilha_favorito_uti_id.toString() + '", "'+ trilha.trilha_favorito_trilha_id.toString() + '")';
  
      console.log(query)
      client_envio.query(query, (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send("Trilha added with ID: " + results.insertId)
      })
    } catch (e) {
      console.log(e);
      response.status(500).json({error: e.message})
    } finally {
      console.log("success");
    }
  }

  ////////////////// DISLIKE DA TRILHA ////////////////////

  const deletetrilhaLike = (req, res) => {
    const trilhaId = req.params.id; // obtém o ID do usuário a partir da URL
    const userId = req.params.userId;
  
    try {
      client.query('DELETE FROM trilhas_favoritas WHERE trilha_id = ?' + ' AND utilizador_id = ?', [trilhaId, userId], (error, results) => {
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

  ///////////////////// APAGAR UM REPORT ////////////////////

  const deletetrilhareport = (req, res) => {
    const reportId = req.params.id; // obtém o ID do usuário a partir da UR

    try {
      client.query('DELETE FROM trilha_report WHERE trilha_report_id = ?', [reportId], (error, results) => {
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

  /////////////////////  OBTER OS REPORTS //////////////////////

  const getreports = (req,res)=>{
    try {
    client.query('SELECT * FROM trilha_report ORDER BY trilha_report_date DESC;',(error,results)=>{
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

  //////////////////// ADQUIRIR UMA TRILHA /////////////////////


  const createtrilhaadquirida = (request, response) => {
    try {
      const trilha = request.body
      const trilha_completada = false

      console.log(trilha)
      const query = 'INSERT INTO trilha_adquirida (trilha_completada, trilha_adquirida_uti_id, trilha_adquirida_trilha_id) VALUES ("'+ trilha_completada + '", "'+ trilha.trilha_adquirida_uti_id.toString() +'", "'+ trilha.trilha_adquirida_trilha_id.toString() + '")';
  
      console.log(query)
      client_envio.query(query, (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send("Trilha added with ID: " + results.insertId)
      })
    } catch (e) {
      console.log(e);
      response.status(500).json({error: e.message})
    } finally {
      console.log("success");
    }
  }


//////////// OBTER NUMERO DE REPORTS DE UMA TRILHA PELO ID DA TRILHA ////////////

const getNumberReportsTrilha = (req, res) => {
    const trilhaId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('SELECT COUNT(*) AS numero_reports FROM trilha_report WHERE trilha_identifier = ?', [trilhaId], (error, results) => {
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

/////////////////// OBTER DETALHES AO ABRIR UM REPORT (SOBRE A TRILHA REPORTADA) /////////////////////

const getReportInfo = (req, res) => {
    const reportId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('SELECT u.utilizador_username, tp.trilha_ponto_inicio, tp.trilha_ponto_destino, tp.trilha_inicio, tp.trilha_destino, t.trilha_nome FROM trilha_report tr JOIN trilha t ON tr.trilha_identifier = t.trilha_id JOIN users u ON t.trilha_criador_id = u.utilizador_id JOIN trilha_place tp ON t.trilha_id = tp.trilha_identifier WHERE tr.trilha_report_id = ?', [reportId], (error, results) => {
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



////////////////////// OBTER TODAS AS TRILHAS JÁ CRIADAS E QUE AINDA NÃO POSSUEM UM LOCAL ADICIONADO (PARA APARECER NUMA LISTA PARA EDITAR O LOCAL) ////////////////////////////

const getEditTrilha = (req, res) => {
    const userId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('SELECT trilha_id, trilha_nome, trilha_descricao, trilha_recompensa_pontos, trilha_preco_pontos, trilha_data_criacao, trilha_aprovada, trilha_dificuldade_id, trilha_criador_id FROM trilha WHERE trilha_possui_local = false AND trilha_criador_id = ?', [userId], (error, results) => {
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

/////////////////// APÓS CRIAR UM LOCAL NUMA TRILHA JÁ EXISTENTE, EXISTE UM POST E UM UPDATE AO CAMPO TRILHA_POSSUI_LOCAL /////////////////////

const getUpdatePossuiLocal = (req, res) => {
    const trilhaId = req.params.id; // obtém o ID do usuário a partir da URL
  e
    try {
      client.query('UPDATE trilha SET trilha_possui_local = true WHERE trilha_id = ?', [trilhaId], (error, results) => {
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

///////////////////// POST PARA INSERIR UM LOCAL NUMA TRILHA JÁ EXISTENTE, APÓS UM UPDATE NO CAMPO DE TRILHA_POSSUI_LOCAL //////////////////////////

 const createtrilhaplace = (request, response) => {
  try {
    const trilha = request.body;

    const query = 'INSERT INTO trilha_place (trilha_inicio, trilha_destino, trilha_ponto_inicio, trilha_ponto_destino, trilha_identifier, trilha_ponto_inicio_latitude, trilha_ponto_inicio_longitude, trilha_ponto_destino_latitude, trilha_ponto_destino_longitude) ' +
      `VALUES ("${trilha.trilha_inicio.toString()}", "${trilha.trilha_destino.toString()}", ST_GeomFromText('POINT(${trilha.trilha_ponto_inicio_latitude.toString()} ${trilha.trilha_ponto_inicio_longitude.toString()})'), ST_GeomFromText('POINT(${trilha.trilha_ponto_destino_latitude.toString()} ${trilha.trilha_ponto_destino_longitude.toString()})'), "${trilha.trilha_identifier.toString()}", "${trilha.trilha_ponto_inicio_latitude.toString()}", "${trilha.trilha_ponto_inicio_longitude.toString()}", "${trilha.trilha_ponto_destino_latitude.toString()}", "${trilha.trilha_ponto_destino_longitude.toString()}")`;

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

////////////////////////////// OBTER TRILHAS QUE JÁ TENHAM LOCAL E TODOS OS OUTROS DETALHES MAS QUE AINDA NÃO FORAM APROVADAS /////////////////////////////////////

const getnotaprovedtrilhas = (req,res)=>{
    try {
    client.query('SELECT t.trilha_id, t.trilha_nome, t.trilha_descricao, t.trilha_recompensa_pontos, t.trilha_preco_pontos, t.trilha_data_criacao, t.trilha_possui_local, t.trilha_aprovada, d.trilha_dificuldade_tipo, u.utilizador_nome FROM trilha t JOIN trilha_dificuldade_tipo d ON t.trilha_dificuldade_id = d.trilha_dificuldade_id_tipo JOIN users u ON t.trilha_criador_id = u.utilizador_id WHERE t.trilha_possui_local = true AND t.trilha_aprovada = false ORDER BY t.trilha_data_criacao DESC;',(error,results)=>{
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

  ////////////////////////////////// APROVAR UMA TRILHA PELO ID ///////////////////////////////

  const getUpdateTrilhaAprovacao = (req, res) => {
    const trilhaId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('UPDATE trilha SET trilha_aprovada = true WHERE trilha_id = ?', [trilhaId], (error, results) => {
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

 


const getnumerocompletasuser = (req, res) => {
    const userId = req.params.id; // obtém o ID do usuário a partir da URL
  
    try {
      client.query('SELECT COUNT(*) AS "Numero de trilhas completas" FROM trilha_adquirida WHERE trilha_adquirida_uti_id = ?' + ' AND trilha_completada = true', [userId], (error, results) => {
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
  

  module.exports = {
  
    deleteTrilhaPlace,
    deleteTrilhaAdquirida,
    deleteTrilhaFavorito,
    deleteTrilhaLike,
    deleteTrilhaReport,
    deleteTrilha,
    updateTrilhaCompleta,
    createtrilhalike,
    deletetrilhaLike,
    deletetrilhareport,
    getreports,
    createtrilhaadquirida,
    getNumberReportsTrilha,
    getReportInfo,
    getEditTrilha,
    getUpdatePossuiLocal,
    createtrilhaplace,
    getnotaprovedtrilhas,
    getUpdateTrilhaAprovacao,
    getnumerocompletasuser

  }

////////////////////////////// MÉTODOS QUE FALTAM //////////////////////////////////

/*

Sendo que, a dificuldade terá que ir ainda vazia, assim como o seu estado de aprovação (a 0) e o de possuir local a 0 também.

iamnotbeluga — 03/04/2023 10:40 PM
OBTER OS EMBATES OCORRIDOS POR ORDEM DECRESCENTE DE OCORRÊNCIA (A LOCALIZAÇÃO É ENVIADA PELO ESP32 QUANDO DETETA UMA COLISÃO E AO FIM DE 30 SEGUNDOS NÃO É DETETADA NENHUMA RESPOSTA DO ALARME PELA PESSOA)

SELECT e.embate_id, e.embate_local, e.embate_data, r.trilha_identifier 
FROM embate e
JOIN trilha_report r ON e.report_id = r.trilha_report_id
ORDER BY e.embate_data DESC;
APAGAR UM EMBATE:

DELETE FROM embate WHERE embate_id = {id};
iamnotbeluga — 03/04/2023 10:59 PM
OBTER INFORMAÇÕES BÁSICAS DE UM UTILIZADOR:

SELECT utilizador_nome AS username, utilizador_email AS email, utilizador_telemovel AS telemovel, utilizador_moedas AS "numero de moedas"
FROM utilizador
WHERE utilizador_id = {id};

Query para obter o número de trilhas completas do utilizador:

SELECT COUNT(*) AS "Numero de trilhas completas"
FROM trilha_completada
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
