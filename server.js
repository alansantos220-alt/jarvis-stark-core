const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Configura o Express para servir ficheiros estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rota de fallback caso aceda à raiz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor JARVIS rodando na porta ${PORT}`);
});
