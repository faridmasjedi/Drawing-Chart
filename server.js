const express = require('express');
const ejs = require('ejs');

const server = express();
server.use( express.static('public'));


server.get('/', (req,res) => {
    res.render('index.ejs');
})

server.get('/documentation', (req,res) => {
    res.render('documentation.ejs');
})

server.get('/todo', (req,res) => {
    res.render('todo.ejs');
})

const PORT = 2357;
server.listen(PORT, () => {
    console.log(`
    -------------------------------
    |    http://localhost:${PORT}    |
    -------------------------------`)
})