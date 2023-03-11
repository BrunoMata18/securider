const express = require('express')
const app = express()
const client = require('../models/connection')
const client_envio = require('../models/recepcaonabd')
const {compileTrust} = require("express/lib/utils");

const getutilizadortipo = (req,res)=>{
  try {
  client.query('select * from utilizador_tipo',(error,results)=>{
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

//get all
const getutilizador = (req,res)=>{
  try {
  client.query('select * from users ',(error,results)=>{
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


const login= (request, response) => {
  try {
  const users = request.body
  console.log("user:  "+JSON.stringify(users))
  client.query('select CONVERT(AES_DECRYPT(utilizador_nome,"key1234") USING utf8 )as nome ,CONVERT(AES_DECRYPT(utilizador_email,"key1234") USING utf8)as email from utilizador ' +
      'where  utilizador_email = AES_ENCRYPT( "'+ users.email.toString() +'" , "key1234") and  utilizador_pass = AES_ENCRYPT( "'+users.pass.toString()+'" , "key1234")' , (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results)
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

const createutilizador = (request, response) => {
  try {
  const users = request.body
  console.log(users)
  const query = 'INSERT INTO users (utilizador_username, utilizador_password, utilizador_ddd, utilizador_telemovel, utilizador_email, utilizador_pontos_sem, utilizador_moedas, utilizador_pontos_totais, utilizador_tipo_id) VALUES ("'+ users.utilizador_username.toString() +'", AES_ENCRYPT( "'+ users.utilizador_password.toString() +'" , "key1234"), "'+ users.utilizador_ddd.toString() +'", "'+ users.utilizador_telemovel.toString() +'", "'+ users.utilizador_email.toString() +'", "'+ users.utilizador_pontos_sem.toString() +'", "'+ users.utilizador_moedas.toString() +'", "'+ users.utilizador_pontos_totais.toString() +'", "'+ users.utilizador_tipo_id.toString() +'")';

  console.log(query)
  client_envio.query(query, (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send("User added with ID: ")
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

const createtrilha = (request, response) => {
  try {
    const trilha = request.body
    const recompensa_inicial = 0
    const dificuldade_inicial_id = 4
    const trilha_aprovada_default = false
    const trilha_possui_local_default = false
    console.log(trilha)
    const query = 'INSERT INTO trilha (trilha_nome, trilha_descricao, trilha_recompensa_pontos, trilha_preco_pontos, trilha_data_criacao, trilha_aprovada, trilha_possui_local, trilha_criador_id, trilha_dificuldade_id) VALUES ("'+ trilha.trilha_nome.toString() +'", "'+ trilha.trilha_descricao.toString() +'", "'+ recompensa_inicial +'", "'+ trilha.trilha_preco_pontos.toString() +'", NOW(), '+ trilha_aprovada_default +', '+ trilha_possui_local_default +', "'+ trilha.trilha_criador_id.toString() +'", "'+ dificuldade_inicial_id +'")';

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




const userdelete = (request, response) => {
  const users = request.body

  const query1 = 'SELECT !ISNULL((SELECT ISNULL(utilizador_id) FROM votenow.utilizador where utilizador_email = AES_ENCRYPT( "'+ users.email.toString() +'" , "key1234") and  utilizador_pass = AES_ENCRYPT( "'+users.pass.toString()+'" , "key1234")))as existe';
  const del = 'DELETE FROM votenow.utilizador where utilizador_email = AES_ENCRYPT( "'+ users.email.toString() +'" , "key1234")';
  try {
    client.query(query1, (error, results) => {
      if (error) {throw error}
      if(!(results[0].existe==1))
      {
        client_envio.query(del, (error, results3) => {
          if (error) {throw error}
          response.status(200).json(results3)
        })
      }
      else
      {
        if((users.email==users.email)) {

          client_envio.query(del, (error, results3) => {
            if (error) {throw error }
            response.status(200).json(results3)
          })

        }
      }
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

const updateuser = (request, response) => {
  try {
    const users = request.body
    console.log(users)
    const query1 = 'SELECT !ISNULL((SELECT ISNULL(utilizador_id) FROM votenow.utilizador where utilizador_email = AES_ENCRYPT( "'+ users.email.toString() +'" , "key1234") and  utilizador_pass = AES_ENCRYPT( "'+users.pass.toString()+'" , "key1234")))as existe';
    const up = 'UPDATE  votenow.utilizador SET utilizador_nome=AES_ENCRYPT("' + users.novonome.toString() + '","key1234"),utilizador_pass=AES_ENCRYPT("' + users.novopass.toString() + '","key1234" ) where utilizador_email=AES_ENCRYPT( "'+ users.email.toString() +'" , "key1234")';
    console.log(up)
    console.log(users)
    client.query(query1, (error, results) => {
      if (error) {throw error}
      if(!(results[0].existe==1))
      {
        client_envio.query(up, (error, results3) => {
          if (error) {
            throw error
          }
          response.status(200).json(results3)
        })
      }
      else
      {
        client_envio.query(up, (error, results3) => {
          if (error) {throw error
            throw new Error(error);}
          response.status(200).json(results3)
        })
      }
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

const getutilizadorId = (req, res) => {
  const userId = req.params.id; // obtém o ID do usuário a partir da URL

  try {
    client.query('SELECT * FROM users WHERE utilizador_id = ?', [userId], (error, results) => {
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
  getutilizador,
  login,
  createutilizador,
  userdelete,
  updateuser,
  getutilizadortipo,
  getutilizadorId,
  createtrilha
}