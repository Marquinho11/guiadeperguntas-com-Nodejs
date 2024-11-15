const Sequelize = require('sequelize');
const connection = require('./database');
const { name } = require('ejs');

//criando tabela e campos dentro do bamco
const Perguntas = connection.define('perguntas', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
    }
});

Perguntas.sync({force: false}).then(()=>{
    console.log('Tabela criada com sucesso');
});
module.exports = Perguntas;