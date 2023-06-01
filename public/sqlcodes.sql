--CODIGOS DA BD E QUERIES UTILIZADAS--

--QUERIES DE PESQUISA--

-- LOGIN DO UTILIZADOR --

SELECT * FROM users WHERE utilizador_username = ?

-- REGISTO DO UTILIZADOR --

INSERT INTO users (utilizador_username, utilizador_password, utilizador_ddd, utilizador_telemovel, utilizador_email, utilizador_pontos_sem, utilizador_moedas, utilizador_pontos_totais, utilizador_tipo_id) VALUES (?,?,?,?,?,?,?,?,?)

-- OBTER OS TIPOS DE UTILIZADOR (UTILIZADOR COMUM, MODERADOR OU UTILIZADOR PREMIUM) --

select * from utilizador_tipo

-- OBTER TODOS OS UTILIZADORES --

select * from users

-- OBTER O LEADERBOARD, OU SEJA, A LISTA DE UTILIZADORES POR ORDEM DECRESCENTE BASEADO NOS PONTOS SEMANAIS --

select * from users order by utilizador_pontos_sem DESC

-- OBTER AS NOVIDADES (SÃO DEPOIS AJEITADAS NUM GRIDVIEW) --

SELECT * FROM trilha WHERE trilha_possui_local = true AND trilha_aprovada = true ORDER BY trilha_data_criacao DESC

-- OBTER UMA PRÉVIA DAS NOVIDADES (NA HOMEPAGE) --

SELECT * FROM trilha WHERE trilha_possui_local = true AND trilha_aprovada = true ORDER BY trilha_data_criacao DESC LIMIT 3

-- OBTER OS FAVORITOS DE UM UTILIZADOR (TRILHAS EM QUE DEU LIKE, QUER SEJAM COMPRADAS OU NÃO PELO UTILIZADOR).

SELECT trilha_like_id, trilha_like_uti_id, trilha_like_trilha_id, trilha_id, trilha_nome, trilha_recompensa_pontos FROM trilha_like INNER JOIN trilha ON trilha.trilha_id = trilha_like.trilha_like_trilha_id WHERE trilha_like_uti_id = ?

-- OBTER ELEMENTOS DA LOJA (TRILHAS QUE NÃO FORAM AINDA ADQUIRIDAS POR UM CERTO UTILIZADOR) --

SELECT * FROM trilha WHERE trilha_possui_local = true  AND trilha_aprovada = true AND trilha_id NOT IN (SELECT trilha_adquirida_id FROM trilha_adquirida WHERE trilha_adquirida_uti_id = ?)' + 'ORDER BY trilha_data_criacao DESC;

-- OBTER UMA PRÉVIA DA LOJA (NA HOMEPAGE) --

SELECT * FROM trilha WHERE trilha_possui_local = true  AND trilha_aprovada = true AND trilha_id NOT IN (SELECT trilha_adquirida_id FROM trilha_adquirida WHERE trilha_adquirida_uti_id = ?)' + 'ORDER BY trilha_data_criacao DESC LIMIT 3

-- OBTER AS TRILHAS PARA REPETIR --

SELECT * FROM trilha INNER JOIN trilha_adquirida ON trilha.trilha_id = trilha_adquirida.trilha_adquirida_trilha_id WHERE trilha_adquirida.trilha_adquirida_uti_id = ?' + 'AND trilha_adquirida.trilha_completada = true;

-- OBTER UMA PRÉVIA DAS TRILHAS PARA REPETIR (QUE JÁ FORAM COMPLETAS E PODEM VOLTAR A SER USADAS) --

SELECT * FROM trilha INNER JOIN trilha_adquirida ON trilha.trilha_id = trilha_adquirida.trilha_adquirida_trilha_id WHERE trilha_adquirida.trilha_adquirida_uti_id = ?' + 'AND trilha_adquirida.trilha_completada = true LIMIT 3

-- OBTER AS TRILHAS QUE UM UTILIZADOR CRIOU --

SELECT * FROM trilha WHERE trilha_criador_id = ? AND trilha_possui_local = 1 AND trilha_aprovada = 1 ORDER BY trilha_data_criacao DESC

-- OBTER A PRÉVIA DE TRILHAS QUE UM UTILIZADOR CRIOU (NA HOMEPAGE) --

SELECT * FROM trilha WHERE trilha_criador_id = ? AND trilha_possui_local = 1 ORDER BY trilha_data_criacao DESC LIMIT 3

-- OBTER OS PONTOS DO UTILIZADOR (PARA QUE POSSA SER DETERMINADO O NIVEL DO MESMO) --

SELECT utilizador_pontos_totais FROM users WHERE utilizador_id = ?

-- OBTER AS MOEDAS DO UTILIZADOR (EXIBIDAS NA LOJA, E QUE PODEM SER USADAS PARA COMPRAR TRILHAS NOVAS) --

SELECT utilizador_moedas FROM users WHERE utilizador_id = ?

-- OBTER O USERNAME DO UTILIZADOR, PARA QUE SEJA EXIBIDO NA HOMEPAGE --

SELECT utilizador_username FROM users WHERE utilizador_id = ?

-- CRIAR UMA TRILHA --

INSERT INTO trilha (trilha_nome, trilha_descricao, trilha_recompensa_pontos, trilha_preco_pontos, trilha_data_criacao, trilha_aprovada, trilha_possui_local, trilha_criador_id, trilha_dificuldade_id) VALUES (?,?,?,?, NOW(),?,?,?,?)

-- APAGAR UM UTILIZADOR (PARA CASOS DE BANIMENTO, POR EXEMPLO, PODIA SER USADA PARA APAGAR VÁRIAS INFORMAÇÕES RELATIVAS A UM UTILIZADOR E EXCLUÍ-LO) --

DELETE FROM users WHERE utilizador_id = ?

-- REMOVER UM LIKE (REMOVENDO DOS FAVORITOS) --

DELETE FROM trilha_like WHERE trilha_like_uti_id = ? AND trilha_like_trilha_id = ?

-- ADQUIRIR UMA TRILHA (ALÉM DO POST, É TAMBÉM FEITA UMA ATUALIZAÇÃO ÁS MOEDAS DO UTILIZADOR) --

INSERT INTO trilha_adquirida (trilha_completada, trilha_adquirida_uti_id, trilha_adquirida_trilha_id) VALUES (?, ?, ?)

-- ADICIONAR UM LIKE NUMA TRILHA --

INSERT INTO trilha_like (trilha_like_uti_id, trilha_like_trilha_id) VALUES (?,?)

-- ADICIONAR UM REPORT A UMA TRILHA --

INSERT INTO trilha_report (trilha_identifier) VALUES (?)

-- ATUALIZAÇÃO ÁS MOEDAS DE UM UTILIZADOR (QUANDO GANHAR OU PERDER MOEDAS AO COMPLETAR TRILHAS OU A COMPRÁ-LAS)

UPDATE users SET utilizador_moedas = ? WHERE utilizador_id = ?

-- ATUALIZAÇÃO AOS PONTOS TOTAIS DO UTILIZADOR --

UPDATE users SET utilizador_pontos_totais = ? WHERE utilizador_id = ?

-- ATUALIZAÇÃO AOS PONTOS SEMANAIS DO UTILIZADOR --

UPDATE users SET utilizador_pontos_sem = ? WHERE utilizador_id = ?

-- OBTER ID DO UTILIZADOR (SERVE PARA VÁRIAS COISAS, MAS A PRINCIPAL É MANTER O UTILIZADOR LOGADO E OBVIAMENTE, AJUSTAR AS INFORMAÇÕES NAS TELAS) --

SELECT * FROM users WHERE utilizador_id = ?

-- OBTER O NUMERO DE TRILHAS JÁ COMPLETAS PELO UTILIZADOR --

SELECT COUNT(*) AS num_trilhas_completas FROM trilha_adquirida WHERE trilha_completada = true AND trilha_adquirida_uti_id = ?

-- ALTERAR O TIPO DE UTILIZADOR (USADO PRINCIPALMENTE QUANDO O UTILIZADOR PRETENDER ADQUIRIR O PLANO PREMIUM) --

UPDATE users SET utilizador_tipo_id = ? WHERE utilizador_id = ?

-- APAGAR O LOCAL RELATIVO A UMA TRILHA (OU SEJA, OS PONTOS DE INICIO E FIM QUE A DEFINEM) --

DELETE FROM trilha_place WHERE trilha_identifier = ?

-- APAGAR TODAS AS AQUISIÇÕES FEITAS SOBRE UMA TRILHA --

DELETE FROM trilha_adquirida WHERE trilha_adquirida_trilha_id = ?

-- APAGAR TODOS OS FAVORITOS RELATIVOS A UMA TRILHA --

DELETE FROM trilha_favorito WHERE trilha_favorito_trilha_id = ?

-- APAGAR TODOS OS LIKES DE UMA TRILHA --

DELETE FROM trilha_like WHERE trilha_like_trilha_id = ?

-- APAGAR UM REPORT FEITO A UMA TRILHA --

DELETE FROM trilha_report WHERE trilha_report_id = ?

-- APAGAR A TRILHA --

DELETE FROM trilha WHERE trilha_id = ?

-- ATUALIZAR UMA TRILHA COMPLETA RELATIVAMENTE AO UTILIZADOR --

UPDATE trilha_adquirida SET trilha_completada = true WHERE trilha_adquirida_trilha_id = ? AND trilha_adquirida_uti_id = ?

-- ADICIONAR O FAVORITO (ACABA POR SER O LIKE) --

INSERT INTO trilha_favorito (trilha_favorito_uti_id, trilha_favorito_trilha_id) VALUES (?,?)

-- APAGAR UM FAVORITO EM PARTICULAR --

DELETE FROM trilhas_favoritas WHERE trilha_id = ? AND utilizador_id = ?

-- APAGAR TODOS OS REPORTS DE UMA TRILHA --

DELETE FROM trilha_report WHERE trilha_identifier = ?

-- OBTER TODOS OS REPORTS (PARA SEREM EXIBIDOS NUMA LISTA NO PAINEL DE ADMINISTRADORES) --

SELECT trilha_report_id, trilha_identifier, trilha_nome FROM trilha_report INNER JOIN trilha ON trilha.trilha_id = trilha_report.trilha_identifier

-- OBTER O NUMERO DE REPORTS FEITOS A UMA TRILHA --

SELECT COUNT(*) AS num_reports FROM trilha_report WHERE trilha_identifier = ?

-- OBTER DETALHES DE UMA TRILHA CUJO REPORT FOI FEITO --

SELECT u.utilizador_username, u.utilizador_id ,tp.trilha_ponto_inicio, tp.trilha_ponto_destino, tp.trilha_inicio, tp.trilha_destino, tp.trilha_ponto_inicio_latitude, tp.trilha_ponto_inicio_longitude, tp.trilha_ponto_destino_latitude, tp.trilha_ponto_destino_longitude ,t.trilha_nome, t.trilha_id FROM trilha_report tr JOIN trilha t ON tr.trilha_identifier = t.trilha_id JOIN users u ON t.trilha_criador_id = u.utilizador_id JOIN trilha_place tp ON t.trilha_id = tp.trilha_identifier WHERE tr.trilha_report_id = ?

-- AO CRIAR UMA TRILHA HÁ DUAS ETAPAS, A CRIAÇÃO DE INFOS BÁSICAS E A ADIÇÃO DE UM LOCAL (ASSIM, AQUI É EXIBIDA A LISTA DAS TRILHAS CUJOS LOCAIS AINDA NÃO FORAM ADICIONADOS) --

SELECT trilha_id, trilha_nome, trilha_descricao, trilha_recompensa_pontos, trilha_preco_pontos, trilha_data_criacao, trilha_aprovada, trilha_possui_local , trilha_dificuldade_id, trilha_criador_id FROM trilha WHERE trilha_possui_local = false AND trilha_aprovada = false AND trilha_criador_id = ?

-- OBTER DETALHES DE UMA TRILHA (SÃO DEPOIS DEVIDAMENTE AJUSTADOS E EXIBIDOS NA TELA DE DETALHES DA TRILHA) --

SELECT trilha_id, trilha_nome, trilha_descricao, trilha_recompensa_pontos, trilha_preco_pontos, trilha_data_criacao, trilha_aprovada, trilha_possui_local, trilha_criador_id, trilha_dificuldade_id, trilha_local_id, trilha_inicio, trilha_destino, trilha_ponto_inicio, trilha_ponto_destino, trilha_identifier, trilha_ponto_inicio_latitude, trilha_ponto_inicio_longitude, trilha_ponto_destino_latitude, trilha_ponto_destino_longitude FROM trilha INNER JOIN trilha_place ON trilha_identifier = trilha.trilha_id WHERE trilha.trilha_id = ?

-- APÓS ADICIONAR O LOCAL, É ATUALIZADO O VALOR BOOLEANO QUE DEFINE QUE AQUELA TRILHA JÁ POSSUI LOCAL E PODE IR ENTÃO PARA APROVAÇÃO DE UM ADMINISTRADOR ANTES SEQUER DE SER EXIBIDO NA TELA DA APLICAÇÃO (CONTROLADO TAMBÉM POR UM BOOLEANO) --

UPDATE trilha SET trilha_possui_local = true WHERE trilha_id = ?

-- INSERIR UM LOCAL NUMA TRILHA --

INSERT INTO trilha_place (trilha_inicio, trilha_destino, trilha_ponto_inicio, trilha_ponto_destino, trilha_identifier, trilha_ponto_inicio_latitude, trilha_ponto_inicio_longitude, trilha_ponto_destino_latitude, trilha_ponto_destino_longitude) VALUES --e os valores--

-- OBTER TRILHAS QUE JÁ TENHAM LOCAL E TODOS OS OUTROS DETALHES MAS QUE AINDA NÃO FORAM APROVADAS --

SELECT t.trilha_id, t.trilha_nome, t.trilha_descricao, t.trilha_recompensa_pontos, t.trilha_preco_pontos, t.trilha_data_criacao, t.trilha_possui_local, t.trilha_aprovada, d.trilha_dificuldade_tipo, u.utilizador_username FROM trilha t JOIN trilha_dificuldade_tipo d ON t.trilha_dificuldade_id = d.trilha_dificuldade_id_tipo JOIN users u ON t.trilha_criador_id = u.utilizador_id WHERE t.trilha_possui_local = true AND t.trilha_aprovada = false ORDER BY t.trilha_data_criacao DESC;

-- APROVAR UMA TRILHA PELO ID --

UPDATE trilha SET trilha_aprovada = true WHERE trilha_id = ?

-- POSSUI LOCAL A UMA TRILHA PELO ID --

UPDATE trilha SET trilha_possui_local = true WHERE trilha_id = ?

-- OBTER NUMERO DE LIKES DUMA TRILHA --

SELECT COUNT(*) AS num_likes FROM trilha_like WHERE trilha_like_trilha_id = ?

-- VERIFICAR SE UM UTILIZADOR JÁ COMPLETOU UMA TRILHA (ISTO É IMPORTANTE POIS PERMITE SABER SE UM UTILIZADOR PODE, POR EXEMPLO, RECEBER OS PONTOS DUMA TRILHA OU NÃO AO COMPLETÁ-LA, POIS NA NOSSA APP, QUEM JÁ TIVER FEITO UMA TRILHA E QUEIRA REPETIR, NÃO RECEBERÁ QUAISQUER PONTOS)

-- VERIFICAR SE UM UTILIZADOR JÁ COMPROU UMA TRILHA, PERMITINDO-O INICIÁ-LA --

SELECT * FROM trilha_adquirida WHERE trilha_adquirida.trilha_adquirida_trilha_id = ? AND trilha_adquirida.trilha_adquirida_uti_id = ?;

-- VERIFICAR SE UM UTILIZADOR JÁ DEIXOU LIKE OU NÃO NUMA TRILHA (PARA AJUSTAR OS BOTÕES DE DEIXAR OU REMOVER UM LIKE) --

SELECT * FROM trilha_like WHERE trilha_like.trilha_like_trilha_id = ? AND trilha_like.trilha_like_uti_id = ?

-- OBTER OS EMBATES OCORRIDOS POR ORDEM DECRESCENTE DE OCORRÊNCIA --

SELECT e.embate_id, e.embate_data, e.embate_local_latitude, e.embate_local_longitude FROM embate e ORDER BY e.embate_data DESC

-- APAGAR UM EMBATE PELO ID --

DELETE FROM embate WHERE embate_id = ?

-- CRIAR UM EMBATE --

INSERT INTO embate (embate_data, embate_local_latitude, embate_local_longitude) VALUES (NOW() , ?, ?)

------------------------------------------------ OUTRAS QUERIES PARA PESQUISAS --------------------------------------------------------

UPDATE users SET utilizador_pontos_semanais = 0;

------------------------------------------------- SQL PARA A CRIAÇÃO DA BASE DE DADOS --------------------------------------------------

--- A BASE DE DADOS É CONSTITUIDA PELAS SEGUINTES TABELAS:

   -- 1. users (RESPONSÁVEL POR ARMAZENAR TODA A INFORMAÇÃO RELATIVA A CADA UTILIZADOR (username, password, indicativo de telemovel, numero de telemovel, email, pontos semanais, pontos totais, moedas e o id respetivo ao tipo de utilizador (utilizador comum, moderador ou premium)))

   CREATE TABLE users (
  utilizador_id INT NOT NULL AUTO_INCREMENT,
  utilizador_username VARCHAR(50) NOT NULL,
  utilizador_password VARCHAR(500) NOT NULL,
  utilizador_ddd INT NOT NULL,
  utilizador_telemovel INT NOT NULL,
  utilizador_email VARCHAR(60) NOT NULL,
  utilizador_pontos_sem INT NOT NULL,
  utilizador_moedas INT NOT NULL,
  utilizador_pontos_totais INT NOT NULL,
  PRIMARY KEY (utilizador_id)
  );

   -- 2. utilizador_tipo (RESPONSÁVEL POR DEFINIR OS TIPOS DE UTILIZADORES EXISTENTES (id do tipo e o tipo associado))

   CREATE TABLE utilizador_tipo (

  utilizador_id_tipo INT NOT NULL AUTO_INCREMENT,
  utilizador_tipo varchar(100) NOT NULL,
  PRIMARY KEY (utilizador_id_tipo)

  );

  ALTER TABLE users
  ADD COLUMN utilizador_tipo_id INT NOT NULL,
  ADD CONSTRAINT fk_utilizador_tipo_id
  FOREIGN KEY (utilizador_tipo_id)
  REFERENCES utilizador_tipo (utilizador_id_tipo);

  INSERT INTO utilizador_tipo (utilizador_tipo) VALUES ('Cliente'),('Moderador'), ('Premium');  

   -- 3. trilha (RESPONSÁVEL POR ARMAZENAR TODAS AS INFORMAÇÕES RELATIVAS Á CRIAÇÃO DE UMA TRILHA, MAIS PRINCIPALMENTE, DADOS BÁSICOS RELATIVAMENTE Á MESMA).

   CREATE TABLE trilha (

    trilha_id INT NOT NULL AUTO_INCREMENT,
    trilha_nome varchar(200) NOT NULL,
    trilha_descricao varchar(500) NOT NULL,
    trilha_recompensa_pontos int DEFAULT 0,
    trilha_preco_pontos int NOT NULL,
    trilha_data_criacao DATE NOT NULL,
    trilha_aprovada BOOLEAN NOT NULL DEFAULT false,
    trilha_possui_local BOOLEAN NOT NULL DEFAULT false,
    PRIMARY KEY (trilha_id)

    );

    ALTER TABLE trilha
ADD COLUMN trilha_dificuldade_id INT,
ADD CONSTRAINT fk_trilha_dificuldade_id
  FOREIGN KEY (trilha_dificuldade_id)
  REFERENCES trilha_dificuldade_tipo (trilha_dificuldade_id_tipo);
  
  ALTER TABLE trilha
ADD COLUMN trilha_criador_id INT,
ADD CONSTRAINT fk_trilha_criador_id
  FOREIGN KEY (trilha_criador_id)
  REFERENCES users (utilizador_id);

   -- 4. trilha_dificuldade_tipo (ARMAZENA AS DIFICULDADES POSSÍVEIS QUE PODEM SER ATRIBUIDAS A UMA TRILHA (SÃO IMPORTANTES PARA SEREM DEFINIDAS COM BASE NA DISTANCIA DA TRILHA))

CREATE TABLE trilha_dificuldade_tipo (

 trilha_dificuldade_id_tipo INT NOT NULL AUTO_INCREMENT,
 trilha_dificuldade_tipo varchar(90) NOT NULL,
 PRIMARY KEY (trilha_dificuldade_id_tipo)
 
);

INSERT INTO trilha_dificuldade_tipo (trilha_dificuldade_tipo) VALUES
('Facil'),
('Média'),
('Dificil');

   -- 5. trilha_adquirida (ARMAZENA AS COMPRAS DE TRILHAS FEITAS PELOS UTILIZADORES, RELACIONANDO AS TABELAS DE UTILIZADORES E DE TRILHAS)

   
CREATE TABLE trilha_adquirida (

trilha_adquirida_id INT NOT NULL AUTO_INCREMENT,
trilha_completada BOOLEAN NOT NULL DEFAULT false,
PRIMARY KEY (trilha_adquirida_id)

);

    ALTER TABLE trilha_adquirida
    ADD COLUMN trilha_adquirida_uti_id INT,
    ADD CONSTRAINT fk_trilha_adquirida_uti_id
    FOREIGN KEY (trilha_adquirida_uti_id)
    REFERENCES users (utilizador_id);

    ALTER TABLE trilha_adquirida
    ADD COLUMN trilha_adquirida_trilha_id INT,
    ADD CONSTRAINT fk_trilha_adquirida_trilha_id
    FOREIGN KEY (trilha_adquirida_trilha_id)
    REFERENCES trilha (trilha_id);

   -- 6. trilha_favorito (ARMAZENA AS TRILHAS FAVORITAS DOS UTILIZADORES - RELACIONA A TABELA DE UTILIZADORES E DE TRILHAS)

     CREATE TABLE trilha_favorito (

     trilha_favorito_id INT NOT NULL AUTO_INCREMENT,
     PRIMARY KEY (trilha_favorito_id)

    );

  ALTER TABLE trilha_favorito
  ADD COLUMN trilha_favorito_uti_id INT,
  ADD CONSTRAINT fk_trilha_favorito_uti_id
  FOREIGN KEY (trilha_favorito_uti_id)
  REFERENCES users (utilizador_id);

  ALTER TABLE trilha_favorito
  ADD COLUMN trilha_favorito_trilha_id INT,
  ADD CONSTRAINT fk_trilha_favorito_trilha_id
  FOREIGN KEY (trilha_favorito_trilha_id)
  REFERENCES trilha (trilha_id);

   -- 7. trilha_like (ARMAZENA OS LIKES QUE SÃO DADOS NAS TRILHAS)

       CREATE TABLE trilha_like (

        trilha_like_id INT NOT NULL AUTO_INCREMENT,
        PRIMARY KEY (trilha_like_id)

       );

    ALTER TABLE trilha_like
    ADD COLUMN trilha_like_uti_id INT,
    ADD CONSTRAINT fk_trilha_like_uti_id
    FOREIGN KEY (trilha_like_uti_id)
    REFERENCES users (utilizador_id);
  
    ALTER TABLE trilha_like
    ADD COLUMN trilha_like_trilha_id INT,
    ADD CONSTRAINT fk_trilha_like_trilha_id
    FOREIGN KEY (trilha_like_trilha_id)
    REFERENCES trilha (trilha_id);

  -- 8. trilha_report (ARMAZENA OS REPORTS QUE SÃO DADOS PELOS UTILIZADORES ÁS TRILHAS, NESTE CASO, OS REPORTS SÃO ANÓNIMOS, ENTÃO SOMENTE A TRILHA É RELACIONADA A UM REPORT)

       CREATE TABLE trilha_report (

        trilha_report_id INT NOT NULL AUTO_INCREMENT,
        trilha_report_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (trilha_report_id)

       );

    ALTER TABLE trilha_report
    ADD COLUMN trilha_identifier INT,
    ADD CONSTRAINT fk_trilha_identifier
    FOREIGN KEY (trilha_identifier)
    REFERENCES trilha (trilha_id);


  -- 9. trilha_place (RELACIONA UMA TRILHA A UM PONTO DE INICIO E DESTINO DA MESMA TRILHA)

  CREATE TABLE trilha_place (
  trilha_local_id INT NOT NULL AUTO_INCREMENT,
  trilha_inicio VARCHAR(100) NOT NULL,
  trilha_destino VARCHAR(100) NOT NULL,
  trilha_ponto_inicio POINT NOT NULL,
  trilha_ponto_destino POINT NOT NULL,
  trilha_identifier INT NOT NULL,
  trilha_ponto_inicio_latitude REAL NOT NULL,
  trilha_ponto_inicio_longitude REAL NOT NULL,
  trilha_ponto_destino_latitude REAL NOT NULL,
  trilha_ponto_destino_longitude REAL NOT NULL,
  PRIMARY KEY (trilha_local_id),
  FOREIGN KEY (trilha_identifier) REFERENCES trilha(trilha_id)
);

 -- 10. embate (ARMAZENA OS EMBATES. NÃO RELACIONA A TRILHAS NEM A UTILIZADORES, APENAS REGISTA A OCORRENCIA DE UM EMBATE NUM PONTO DE COORDENADAS, PONTO ESSE QUE É O PONTO DO MARCADOR QUE O REPRESENTA DURANTE A EXECUÇÃO DA TRILHA)

 CREATE TABLE embate (
  embate_id INT NOT NULL AUTO_INCREMENT,
  embate_data TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  embate_local_latitude REAL NOT NULL,
  embate_local_longitude REAL NOT NULL,
  PRIMARY KEY (embate_id)

);

------------------ IMPORTAÇÕES DE CONFIGURAÇÕES PARA DADOS DO TIPO SPATIAL (QUE PERMITEM ARMAZENAR PONTOS, POR EXEMPLO) ---------------

SHOW PLUGINS;

SELECT PLUGIN_NAME, PLUGIN_STATUS FROM INFORMATION_SCHEMA.PLUGINS WHERE PLUGIN_NAME LIKE 'spatial';

INSTALL PLUGIN mysql_no_login SONAME 'libgeometry.so';

SELECT `srs_name`, `srs_id`
FROM INFORMATION_SCHEMA.ST_SPATIAL_REFERENCE_SYSTEMS

------------------ INSERT INICIAL DE TRILHAS-TESTE -------------------

INSERT INTO trilha (trilha_nome, trilha_descricao, trilha_recompensa_pontos, trilha_preco_pontos, trilha_data_criacao, trilha_aprovada, trilha_possui_local, trilha_dificuldade_id, trilha_criador_id) 
VALUES ('Trilha das Cachoeiras', 'Trilha com diversas cachoeiras e vistas incríveis', 100, 20, '2022-01-01', true, true, 2, 1);

INSERT INTO trilha (trilha_nome, trilha_descricao, trilha_recompensa_pontos, trilha_preco_pontos, trilha_data_criacao, trilha_aprovada, trilha_possui_local, trilha_dificuldade_id, trilha_criador_id) 
VALUES ('Trilha das Montanhas', 'Trilha com belas paisagens montanhosas', 150, 30, '2022-02-01', true, true, 3, 2);

INSERT INTO trilha (trilha_nome, trilha_descricao, trilha_recompensa_pontos, trilha_preco_pontos, trilha_data_criacao, trilha_aprovada, trilha_possui_local, trilha_dificuldade_id, trilha_criador_id) 
VALUES ('Trilha dos Animais', 'Trilha com diversidade de animais selvagens', 200, 40, '2022-03-01', true, true, 1, 3);

INSERT INTO trilha (trilha_nome, trilha_descricao, trilha_recompensa_pontos, trilha_preco_pontos, trilha_data_criacao, trilha_aprovada, trilha_possui_local, trilha_dificuldade_id, trilha_criador_id) 
VALUES ('Trilha da Praia', 'Trilha com vista para o mar e praias paradisíacas', 120, 25, '2022-04-01', false, true, 2, 4);

INSERT INTO trilha (trilha_nome, trilha_descricao, trilha_recompensa_pontos, trilha_preco_pontos, trilha_data_criacao, trilha_aprovada, trilha_possui_local, trilha_dificuldade_id, trilha_criador_id) 
VALUES ('Trilha da Mata Atlântica', 'Trilha com vista para a Mata Atlântica e rios cristalinos', 180, 35, '2022-05-01', false, true, 3, 5);

------------------ INSERT INICIAL DE UTILIZADORES-TESTE ----------------------

INSERT INTO users (utilizador_username, utilizador_password, utilizador_ddd, utilizador_telemovel, utilizador_email, utilizador_pontos_sem, utilizador_moedas, utilizador_pontos_totais, utilizador_tipo_id) VALUES 
('usuario1', 'senha1', 11, 99999999, 'usuario1@example.com', 10, 20, 30, 1),
('usuario2', 'senha2', 22, 88888888, 'usuario2@example.com', 20, 30, 40, 1),
('usuario3', 'senha3', 33, 77777777, 'usuario3@example.com', 30, 40, 50, 2),
('usuario4', 'senha4', 44, 66666666, 'usuario4@example.com', 40, 50, 60, 2),
('usuario5', 'senha5', 55, 55555555, 'usuario5@example.com', 50, 60, 70, 1);




