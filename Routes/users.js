const express = require('express');
const router = express.Router();
const Users = require('../Models/user');

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


router.get('/', async(req, res) => {
    try {
        const users = await Users.find({});
        return res.send(users);
    } catch (error) {
        return res.send({ error: 'Erro na consulta de usuários'})
    }
});

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

router.post('/create', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) 
    {
        return res.status(400).send({ error: 'Dados incorretos para criação do usuário' });
    }
    try 
    {
        if (await Users.findOne({ email })) return res.send({ error: 'Usuário já registrado!'});

        const user = await Users.create(req.body);
        user.password = undefined;
        return res.send(user);
    } catch (err) 
    {
        return res.send({ error: `Erro ao buscar usuário: ${err.message}` });
    }
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) return res.send({ error: "Dados insuficientes" });

    try 
    {
        const user = await Users.findOne({ email }).select('+password');    
        if (!user) return res.send({ error: "Usuário não registrado!" });
        
        const pass_ok = await bcrypt.compare(password, user.password);
        if (!pass_ok) return res.send({ error: "Erro ao autenticar usuário!" });
        user.password = undefined;
        return res.send(user);
    } 
    catch (error) 
    {
        return res.send({ error: "Erro ao buscar usuário!" });
    }
});
  

module.exports = router;