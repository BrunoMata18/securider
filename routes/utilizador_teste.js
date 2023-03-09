const express = require('express')
const app = express()
const client = require('../models/connection')
const client_envio = require('../models/recepcaonabd')
const {compileTrust} = require("express/lib/utils");

//get all
const getutilizador = (req,res)=>{
  try {
  client.query('select * from utilizador ',(error,results)=>{
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



//Fazer quantos votos uma resposta teve numa determinada pergunta


const resultvot = (request, response) => {
  try {
  const users = request.body
  const query = 'select utilizador.utilizador_id from utilizador ' +
      'inner join tipo_uti_rel on utilizador.utilizador_id = tipo_uti_rel.utilizador_id ' +
      'inner join tipo on tipo_uti_rel.tipo_utilizador_id = tipo.tipo_utilizador_id ' +
      'where tipo = "admin" and utilizador_email = AES_ENCRYPT( "'+ users.email.toString() +'" , "key1234") and  utilizador_pass = AES_ENCRYPT( "'+users.pass.toString()+'" , "key1234")'
  client.query(query, (error, results) => {if (error) {throw error}
    const aa = JSON.stringify(results);
    const bb = JSON.parse(aa)


    if(aa.localeCompare("[]") != 0) {

      console.log("allallalala");
      const id = parseInt(bb[0].utilizador_id);
      const query2 = 'select perguntas.perguntas_id,pergunta,respostas,COUNT(DISTINCT(respostas_utilizador_rel.utilizador_id)) AS quantidade_respostas from perguntas ' +
          'inner join respostas on perguntas.perguntas_id = respostas.perguntas_id ' +
          'left join respostas_utilizador_rel on respostas.respostas_id = respostas_utilizador_rel.respostas_id ' +
          'where perguntas.utilizador_id = ' + id + ' group by respostas.respostas_id  '

      console.log(query2)
      client.query(query2, (error, results2) => {
        if (error) {
          throw error
        }
        console.log(results2)
        response.status(200).json(results2)

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

const voto= (request, response) => {
  try {
    const users = request.body
    console.log("user:  "+JSON.stringify(users))
    client_envio.query('INSERT INTO votenow.respostas_utilizador_rel (utilizador_id,respostas_id) values ((SELECT utilizador_id from utilizador ' +
        'where utilizador_email = AES_ENCRYPT( "'+ users.email.toString() +'" , "key1234") and utilizador_pass = AES_ENCRYPT( "'+users.pass.toString()+'" , "key1234")) ,"'+ users.resposta_id.toString() +'");' , (error, results) => {

      if (error) {
        throw error
      }
      console.log(results);
      response.status(200).json("")
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







module.exports = {
  getutilizador,
  login,
  createutilizador,
  userdelete,
  updateuser,
  resultvot,
  voto
}