const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//string de conexao: mongodb+srv://usuario_admin:<password>@clusterapi.9dnc6k6.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://usuario_admin:Kaue132302@cluster0.tiqrs.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://usuario_admin:Kaue132302@cluster0.tiqrs.mongodb.net/sms-api?retryWrites=true&w=majority

//CONFIGURAÇÕES DO MONGODB
const url = 'mongodb+srv://usuario_admin:Kaue132302@cluster0.tiqrs.mongodb.net/cluster0?retryWrites=true&w=majority';
// const options = {useNewUrlParser: true};

mongoose.connect(url);
// mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err)  => {
    console.log('Erro na conexão com o banco de dados:' + err);
})

mongoose.connection.on('disconnected', (err)  => {
    console.log('Aplicação desconectada do banco de dados:');
})

mongoose.connection.on('connected', (err)  => {
    console.log('Aplicação conectada do banco de dados:');
})

//BODY PARSER
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//ROTAS
const indexRoute = require('./Routes/index');
const usersRoute = require('./Routes/users');

app.use('/', indexRoute);
app.use('/users', usersRoute);

app.listen(3000); //porta de conexão da API

module.exports = app;

//Métodos GET e POST na integra
// app.get('/', (req, res) => {
//     let obj = req.query;
//     return res.send({message: `Tudo Ok! com o método GET! VOcê enviou o nome ${obj.nome} com idade de ${obj.idade} anos!`});
// })

// app.post('/', (req, res) => {
//     return res.send({message: 'Tudo Ok! com o método POST!'});
// })