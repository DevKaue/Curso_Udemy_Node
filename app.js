const express = require('express');
const app = express();

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