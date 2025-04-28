const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/auth');

router.get('/', auth,(req,res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Informações são muito importantes. Usuários não autorizados não deveriam recebê-las!'});
})

router.post('/', auth,(req,res) => {
    console.log(res.locals.auth_data);
    return res.send({message: 'Informações são muito importantes. Usuários não autorizados não deveriam recebê-las!'});
})

module.exports = router;