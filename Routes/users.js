const express = require('express');
const router = express.Router();
const Users = require('../Models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const configs = require('../Config/config');
// router.get('/', (req,res) => {
//     Users.find({}).exec((err,data) => {
//         if(err) return res.send({error: 'Erro na consulta de usuários!'})
//         return res.send(data);
//     });
// });


//Criação de usuários

// router.post('/create', (req,res) => {
//     const {email, password} = req.body;

//     if(!email || !password) return res.send({error: 'Dados incorretos para criação do usuário'});

//     //Desistruturando os Dados
//     Users.findOne({email}, (err,data) => {
//         if(err) return res.send({error: 'Erro ao buscar usuário'});
//         if(data) return res.send({error: 'Usuário já registrado!'});

//         Users.create(req.body, (err,data) => {
//             if(err) return res.send({error: 'Erro ao criar usuário!'});
//             return res.send(data);
//         });
//     });
// });


//Forma antiga do mongoose
// router.post('/create', (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).send({ error: 'Dados incorretos para criação do usuário' });
//     }

//     Users.findOne({ email }).exec((err, existingUser) => {
//         if (err) {
//             return res.status(500).send({ error: `Erro ao buscar usuário: ${err.message}` });
//         }

//         if (existingUser) {
//             return res.status(400).send({ error: 'Usuário já registrado!' });
//         }

//         Users.create(req.body, (err, newUser) => {
//             if (err) {
//                 return res.status(500).send({ error: `Erro ao criar usuário: ${err.message}` });
//             }
//             data.password = undefined;
//             res.status(201).send(newUser);
//         });
//     });
// });

//Funções Auxiliares

const createUserToken = (userId) => {
    return jwt.sign({ id: userId }, configs.jwt_pass, {expiresIn: configs.jwt_expires});
}

router.get('/', async(req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (error) {
        return res.status(500).send({ error: 'Erro na consulta de usuários'})
    }
});

router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).send({ error: 'Dados incorretos para criação do usuário' });

    try 
    {
        if (await Users.findOne({ email })) return res.send({ error: 'Usuário já registrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.status(201).send({user, token: createUserToken(user.id)});
    } catch (err) 
    {
        return res.status(500).send({ error: `Erro ao buscar usuário: ${err.message}` });
    }
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.status(400).send({ error: "Dados insuficientes" });

    try 
    {
        const user = await Users.findOne({ email }).select('+password');    
        if (!user) return res.status(400).send({ error: "Usuário não registrado!" });
        
        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok) return res.status(401).send({ error: "Erro ao autenticar usuário!" });
        user.password = undefined;
        return res.send({user, token: createUserToken(user.id)});
    } 
    catch (error) 
    {
        return res.status(500).send({ error: "Erro ao buscar usuário!" });
    }
});
  
module.exports = router;