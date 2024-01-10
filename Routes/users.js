const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
    return res.send({message: 'Tudo Okay com o método GET de usuários'});
})

router.post('/', (req,res) => {
    return res.send({message: 'Tudo Okay com o método POST de usuários'});
})

//Criação de usuários

router.post('/create', (req,res) => {
    return res.send({message: 'Seu usuário foi criado'});
})

module.exports = router;