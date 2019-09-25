const express = require('express');
const usersDao = require('../database/dao/users');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const router = express.Router();

router.post('/register', async (req, res) => {
    if(req.body.hash != authConfig.register) 
        return res.status(400).send({error: "Registration unauthorized"});

    user = new User(req.body.login, req.body.password);
    usersDao.insert(user).then((user)=>{
        return res.send({user});
    }).catch((err)=>{
        res.status(400).send({error: 'Registration Failed'});
    });
});

router.post('/authenticate', async(req, res) => {
    const {login, password} = req.body;
    user = await usersDao.getByLogin(login);

    if(!user) 
        return res.status(400).send({error: 'User not found'});
    
    if(!await bcrypt.compare(password, user.password)) 
        return res.status(400).send({error: 'Invalid password'});

    user.password = undefined;

    const token = jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400
    });

    res.send({user, token});
})

module.exports = app => app.use('/auth', router);