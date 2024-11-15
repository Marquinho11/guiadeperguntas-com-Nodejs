const Sequelize = require('sequelize');

const connection = new Sequelize('perguntas', 'root', 'Marquinhos12@',{
    host: 'localhost',
    dialect: 'mysql',
    
});


//exportando a conexãO do banco
module.exports =connection;