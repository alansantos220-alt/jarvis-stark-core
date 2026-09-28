const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa a IA com a chave de ambiente do Render
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota da API do J.A.R.V.I.S. em tempo real
app.post('/api/jarvis', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: "Nenhum comando fornecido, senhor." });
        }

        // Utiliza o modelo gemini-1.5-flash para máxima compatibilidade e rapidez
        const model = genAI.getGenerativeModel({ 
            model: 'gemini-1.5-flash',
            systemInstruction: "Você é o J.A.R.V.I.S., o assistente de inteligência artificial avançado criado por Tony Stark. Responda sempre em português do Brasil, de forma prestativa, inteligente, sofisticada e técnica quando necessário, tratando o utilizador sempre por 'senhor'. Mantenha as respostas focadas em conversas de assistência."
        });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text() || "Sistemas ativos, mas sem retorno de dados, senhor.";

        res.json({ response: responseText });

    } catch (err) {
        console.error("Erro na API:", err);
        res.status(500).json({ error: "Falha ao processar o núcleo de inteligência, senhor." });
    }
});

// Rota de fallback
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor JARVIS rodando na porta ${PORT}`);
});
