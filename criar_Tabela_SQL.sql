CREATE TABLE usuarios (
    nome varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    idade INT  NOT NULL

);

INSERT INTO usuarios(
    nome,email,idade
) VALUES ('Passou', 'teste@gmail.com',29);