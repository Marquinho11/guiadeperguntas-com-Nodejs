const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const pergunta = require('./database/TablePerguntas');
const Resposta = require('./database/Resposta');
const port = 3000;

connection.authenticate().then(()=>{
    console.log('Conexão feita');
}).catch(err => console.log(err));
//configuração de qual framework vai usar
app.set('view engine', 'ejs');//
//para selecionar um diretorio
app.use(express.static('public'));
//body-parse para pegar os dados do usuario
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());



app.get("/", (req, res)=>{
    res.render('perguntas')
});
 //busca as informações no banco de dados e ordena por id do maior para o menor
app.get("/historico",(req, res)=>{
    pergunta.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(perguntas => {
        
        res.render('historico',{
            perguntas: perguntas
        });
    });
    
});

//salva as informações no banco de dados
app.post("/save", (req, res)=>{
    var titulo = req.body.title;
    var desc = req.body.description;
    pergunta.create({
        title: titulo,
        description: desc
    }).then(()=>{
        res.redirect("/historico");
    });
});


//consulta no banco de dados por id da pergunta
app.get("/perguntar/:id",(req, res) => {
    var id = req.params.id;
    pergunta.findOne({where:{id: id}}).then((pergunta)=>{
        if (pergunta != undefined) {
            
            res.render("responder",{
                pergunta: pergunta
            });
        }else{
            res.redirect("/perguntas");
        }
    });
});

app.post("/respostas", (req,res)=>{
    var corpo = req.body.corpo;
    var perguntaID = req.body.perguntat;
    Resposta.create({
        corpo: corpo,
        perguntaID: perguntaID

    }).then(()=>{
        res.redirect("/perguntar/"+perguntaID);
    });
});



//configuração do link de acesso
app.listen(port, (erro)=>{
    if(erro) {
        console.log(erro);
    }else{
        console.log("Servidor rodando na porta http://localhost:3000");
    }
});

