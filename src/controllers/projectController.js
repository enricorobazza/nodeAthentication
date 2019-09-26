const express = require('express');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
    res.send({ok: true, id: req.userId});
});

router.post('/clients', (req, res) => {
    console.log(req.body.name, req.body.email, req.body.number);
});

module.exports = app => app.use('/project', router);