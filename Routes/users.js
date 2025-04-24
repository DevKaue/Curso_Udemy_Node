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


router.get('/', (req, res) => {
    Users.find({}).exec()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({ error: `Erro na consulta de usuários: ${err.message}` });
        });
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

    if (!email || !password) {
        return res.status(400).send({ error: 'Dados incorretos para criação do usuário' });
    }

    try {
      const user = await Users.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).send('Usuário já regsitrado!');
      }
  
      const newUser = new Users(req.body);
      await newUser.save();
  
      res.status(201).send(newUser);
    } catch (err) {
      console.error(err);
      if (err.message.includes('criar')) {
        return res.status(500).send({ error: `Erro ao criar usuário: ${err.message}` });
    } else {
        return res.status(500).send({ error: `Erro ao buscar usuário: ${err.message}` });
    }
    }
  });
  

module.exports = router;