const express = require('express')
const app = express()
const client = require('../models/connection')
//const client_envio = require('../models/recepcaonabd')
const client_envio = require('../models/connection')
const bcrypt = require('bcrypt');


const {compileTrust} = require("express/lib/utils");

///////////// REGISTO DO UTILIZADOR //////////////

const createutilizador = (request, response) => {
  try {
    const users = request.body;
    const saltRounds = 10;
    console.log(users);

    bcrypt.hash(users.utilizador_password, saltRounds, function(err, hash) {
      if (err) throw err;

      const query = 'INSERT INTO users (utilizador_username, utilizador_password, utilizador_ddd, utilizador_telemovel, utilizador_email, utilizador_pontos_sem, utilizador_moedas, utilizador_pontos_totais, utilizador_tipo_id) VALUES ("'+ users.utilizador_username.toString() +'", "'+ hash +'", "'+ users.utilizador_ddd.toString() +'", "'+ users.utilizador_telemovel.toString() +'", "'+ users.utilizador_email.toString() +'", "'+ users.utilizador_pontos_sem.toString() +'", "'+ users.utilizador_moedas.toString() +'", "'+ users.utilizador_pontos_totais.toString() +'", "'+ users.utilizador_tipo_id.toString() +'")';

      console.log(query);
      client_envio.query(query, (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send("User added with ID: ");
      });
    });
  } catch (e) {
    console.log(e);
    response.status(200).json("error");
  } finally {
    console.log("success");
  }
}

////////// OBTER OS TIPOS DE UTILIZADOR //////////

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

/////////// OBTER TODOS OS UTILIZADORES ////////////
const getutilizador = (req,res)=>{
  try {
  client.query('select * from users',(error,results)=>{
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

/////////// OBTER TODOS OS UTILIZADORES 2 ////////////
const getutilizador2 = (req,res)=>{
  try {
  client.query('select * from users order by utilizador_pontos_sem DESC',(error,results)=>{
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

const getutilizador3 = (req,res)=>{
  try {
  client.query('SELECT * FROM trilha WHERE trilha_possui_local = true AND trilha_aprovada = true ORDER BY trilha_data_criacao DESC',(error,results)=>{
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

///////// OBTER TODOS OS 50 PRIMEIROS UTILIZADORES (LEADERBOARD) /////////

const getutilizadorleaderboard = (req,res)=>{
  try {
  client.query('select * from users order by utilizador_pontos_sem DESC',(error,results)=>{
    if(error)
    {
      throw error
    }
    res.status(200).json(results)

    console.log(results);
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


///////// OBTER NOVIDADES ////////

const getnovidades = (req,res)=>{
  try {
  client.query('SELECT * FROM trilha WHERE trilha_possui_local = true AND trilha_aprovada = true ORDER BY trilha_data_criacao DESC; ',(error,results)=>{
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


//////// OBTER ITEMS DA LOJA ////////


const getutilizadorLoja = (req, res) => {
  const userId = req.params.id; // obtém o ID do usuário a partir da URL

  try {
    client.query('SELECT * FROM trilha WHERE trilha_possui_local = true  AND trilha_aprovada = true AND trilha_id NOT IN (SELECT trilha_adquirida_id FROM trilha_adquirida WHERE trilha_adquirida_uti_id = ?' + 'ORDER BY trilha_data_criacao DESC;', [userId], (error, results) => {
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

///////// OBTER PARA REPETIR /////////

const getutilizadorParaRepetir = (req, res) => {
  const userId = req.params.id; // obtém o ID do usuário a partir da URL

  try {
    client.query('SELECT trilha.* FROM trilha INNER JOIN trilha_adquirida ON trilha.trilha_id = trilha_adquirida.trilha_adquirida_trilha_id WHERE trilha_adquirida.trilha_adquirida_uti_id = ?' + 'AND trilha_adquirida.trilha_completada = true;', [userId], (error, results) => {
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

///////// OBTER AS TRILHAS DO UTILIZADOR //////////


const getutilizadorMinhasTrilhas = (req, res) => {
  const userId = req.params.id; // obtém o ID do usuário a partir da URL

  try {
    client.query('SELECT * FROM trilha WHERE trilha_criador_id = ?' + 'ORDER BY trilha_data_criacao DESC', [userId], (error, results) => {
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


///////// OBTER OS PONTOS DO UTILIZADOR PELO ID (PARA QUE NO ANDROID SEJA CALCULADO O NIVEL) ///////////


const getutilizadorPontos = (req, res) => {
  const userId = req.params.id; // obtém o ID do usuário a partir da URL

  try {
    client.query('SELECT utilizador_pontos_totais FROM users WHERE utilizador_id = ?', [userId], (error, results) => {
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

////////// OBTER O NOME DO UTILIZADOR PELO ID (PARA QUE SEJA EXIBIDO NO NA HOMEPAGE) ////////////

const getutilizadorUsername = (req, res) => {
  const userId = req.params.id; // obtém o ID do usuário a partir da URL

  try {
    client.query('SELECT utilizador_username FROM users WHERE utilizador_id = ?', [userId], (error, results) => {
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

/////////////// APAGAR UMA TRILHA //////////////



//////// LOGIN DO UTILIZADOR ///////

const login = (request, response) => {
  try {
    const users = request.body;
    console.log("user: " + JSON.stringify(users));

    client.query(
      'SELECT * FROM users WHERE utilizador_username = ?',
      [users.utilizador_username],
      (error, results) => {
        if (error) {
          throw error;
        }

        if (results.rows.length > 0) {
          const hash = results.rows[0].utilizador_password;
          const userId = results.rows[0].utilizador_id;

          bcrypt.compare(users.utilizador_password, hash, function (err, res) {
            if (res === true) {
              response.status(200).json({ message: "Login successful", userId });
            } else {
              response
                .status(401)
                .json({ message: "Incorrect email or password" });
            }
          });
        } else {
          response
            .status(401)
            .json({ message: "Incorrect email or password" });
        }
      }
    );
  } catch (e) {
    console.log(e);
    response.status(500).json({ message: "An error occurred" });
  }
};



/*LOGIN - 1º VERSÃO DA FUNÇÃO

const login= (request, response) => {
  try {
    const users = request.body
    console.log("user:  "+JSON.stringify(users))



    client.query('SELECT utilizador_password FROM utilizador WHERE utilizador_username = ("'+ users.utilizador_username.toString() +'")', (error, results) => {
      if (error) {
        throw error
      }

      if (results.rows.length > 0) {
        const hash = results.rows[0].utilizador_password

        bcrypt.compare(users.utilizador_password, hash, function(err, res) {
          if (res === true) {
            response.status(200).json({ message: 'Login successful' })
          } else {
            response.status(401).json({ message: 'Incorrect email or password' })
          }
        })
      } else {
        response.status(401).json({ message: 'Incorrect email or password' })
      }
    })
  } catch (e) {
    console.log(e)
    response.status(500).json({ message: 'An error occurred' })
  }
}


*/



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




const userdelete = (req, res) => {
  const userId = req.params.id; // obtém o ID do usuário a partir da URL

  try {
    client.query('DELETE FROM users WHERE utilizador_id = ?', [userId], (error, results) => {
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
  createutilizador,
  getutilizadortipo,
  getutilizador,
  getnovidades,
  getutilizadorLoja,
  getutilizadorParaRepetir,
  getutilizadorMinhasTrilhas,
  getutilizadorPontos,
  getutilizadorUsername,
  login,
  createtrilha,
  userdelete,
  updateuser,
  getutilizadorId,
  getutilizadorleaderboard,
  getutilizador2,
  getutilizador3
}