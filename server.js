const express = require('express');
const path = require('path');
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = process.env.PORT || 3000;

// Inicializa o cliente do Gemini (ele vai buscar a chave GEMINI_API_KEY configurada no Render)
const ai = new GoogleGenAI();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rota da API para conversar com o J.A.R.V.I.S. em tempo real
app.post('/api/jarvis', async (req, res) => {
    try {
        const { prompt } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: "Nenhum comando fornecido, senhor." });
        }

        // Instrução de sistema para moldar a personalidade do assistente como o J.A.R.V.I.S.
        const systemInstruction = "Você é o J.A.R.V.I.S., o assistente de inteligência artificial avançado criado por Tony Stark. Responda sempre em português do Brasil, de forma prestativa, inteligente, ligeiramente sofisticada ou técnica quando necessário, e trate o utilizador sempre por 'senhor'. Mantenha as respostas concisas e naturais para conversas de voz.";

        // Chamada ao modelo Gemini em tempo real
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [prompt],
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
            }
        });

        const respostaTexto = response.text || "Sistemas operacionais ativos, mas não recebi dados de retorno, senhor.";
        res.json({ response: respostaTexto });

    } catch (err) {
        console.error("Erro na API do Gemini:", err);
        res.status(500).json({ error: "Falha ao consultar o núcleo de inteligência, senhor." });
    }
});

// Rota de fallback
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor JARVIS rodando na porta ${PORT}`);
});
