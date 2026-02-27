const express = require('express');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Rotas
app.get('/', (req, res) => res.render('index'));
app.get('/produto', (req, res) => res.render('produto'));
app.get('/fotos', (req, res) => res.render('fotos'));
app.get('/detalhes', (req, res) => res.render('detalhes'));
app.get('/contato', (req, res) => res.render('contato'));

// Rota POST para salvar o formulário
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

// Porta fixa em 3000 para teste
app.listen(3000, () => {
    console.log("-----------------------------------------");
    console.log("SERVIDOR ONLINE EM: http://localhost:3000");
    console.log("-----------------------------------------");
});