const express = require('express');
const bodyParser = require('body-parser');
const usersDao = require('./database/dao/users');
const User = require('./models/user');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

app.get('/', (req, res)=>{
    res.send("OK");
});

app.listen(3001);