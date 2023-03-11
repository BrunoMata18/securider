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
  const query = 'INSERT INTO utilizador (utilizador_nome,utilizador_email,utilizador_pass) VALUES (AES_ENCRYPT( "'+ users.nome.toString() +'" , "key1234"),AES_ENCRYPT( "'+ users.email.toString() +'" , "key1234") ,AES_ENCRYPT( "'+users.pass.toString()+'" , "key1234"))';
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
  getutilizadorId
}