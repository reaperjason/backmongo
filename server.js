const express = require('express');
const bodyParser = require('body-parser');
//const router = require('./components/message/network')
const router = require('./network/routes');
const { config } = require('./config');
const db = require("./db");
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;
const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;
//const MONGO_URI = 'mongodb+srv://carlos:carlos123@cluster0.wtwbntm.mongodb.net/test';

db(MONGO_URI);
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(router);
router(app);



app.use('/app', express.static('public'));
app.listen(4444);
console.log('Escuchando en 4444');