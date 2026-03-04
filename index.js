const express = require('express');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => res.render('index'));
app.get('/produto', (req, res) => res.render('produto'));
app.get('/fotos', (req, res) => res.render('fotos'));
app.get('/detalhes', (req, res) => res.render('detalhes'));
app.get('/contato', (req, res) => res.render('contato'));


app.post('/contato', (req, res) => {
    const dados = req.body;
    
    fs.readFile('dados.json', 'utf8', (err, content) => {
        let json = [];
        if (!err && content) {
            try {
                json = JSON.parse(content);
            } catch (e) { json = []; }
        }
        json.push({ ...dados, data: new Date() });

        fs.writeFile('dados.json', JSON.stringify(json, null, 2), (err) => {
            if (err) return res.send("Erro ao salvar!");
            res.send("<h1>Dados salvos!</h1><a href='/'>Voltar</a>");
        });
    });
});


app.get('/lista', (req, res) => {
    fs.readFile('dados.json', 'utf8', (err, content) => {
        let vetorDados = [];
        
        if (!err && content) {

            try {
                vetorDados = JSON.parse(content);
            } catch (e) {
                vetorDados = [];
            }
        }


        res.render('lista', { lista: vetorDados });
    });
});


app.listen(3000, () => {
    console.log("-----------------------------------------");
    console.log("SERVIDOR ONLINE EM: http://localhost:3000");
    console.log("-----------------------------------------");
});
