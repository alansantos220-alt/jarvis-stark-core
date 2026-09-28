const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para JSON e ficheiros estáticos
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota da API do JARVIS para processar os comandos
app.post('/api/jarvis', (req, res) => {
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ error: "Nenhum comando fornecido, senhor." });
    }

    // Resposta simulada inteligente do JARVIS (pode integrar IA real depois se desejar)
    let resposta = `Comando recebido e processado com sucesso, senhor: "${prompt}". Todos os sistemas operacionais a operar dentro dos parâmetros normais.`;
    
    const t = prompt.toLowerCase();
    if (t.includes('status') || t.includes('sistema')) {
        resposta = "Todos os núcleos Stark, geradores de arco e telemetria de rede estão operacionais, senhor.";
    } else if (t.includes('olá') || t.includes('ola') || t.includes('jarvis')) {
        resposta = "Olá, senhor. É um prazer vê-lo a operar o núcleo holográfico novamente. O que deseja fazer hoje?";
    }

    res.json({ response: resposta });
});

// Rota de fallback para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor JARVIS rodando na porta ${PORT}`);
});
