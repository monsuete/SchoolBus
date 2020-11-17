const app = require('express')()
const consign = require('consign')
const db = require('./config/db')
const bodyParser = require('body-parser');
const multer = require('multer')

app.db = db

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any());

consign()
    .then('./config/middlewares.js')
    .then('./api/validation.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(3001, () => {
    console.log('Backend executando 2');
})