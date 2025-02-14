const express = require('express');

const routes = express.Router();

const Telefone = require('./controllers/telefone');

routes.get('/', (req, res) => {
    res.send('API Agenda de Telefones Respondendo');
});

routes.post('/telefones', Telefone.create);
routes.get('/telefones', Telefone.read);
routes.delete('/telefones/:id', Telefone.deleteTelefone);

module.exports = routes;
