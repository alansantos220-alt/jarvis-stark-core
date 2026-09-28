const express = require('express');
const { OpenAI } = require('openai');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    const { prompt, apiKey } = req.body;
    
    if (!apiKey) {
        return res.status(400).json({ error: "Chave de API não informada." });
    }

    try {
        const openai = new OpenAI({ apiKey: apiKey });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { 
                    role: "system", 
                    content: "Você é o Jarvis, assistente de voz para um motociclista. Seja extremamente curto, direto e objetivo nas respostas, pois o usuário está pilotando e ouvindo via fone Bluetooth. Responda imediatamente ao que for pedido sobre clima, trânsito ou consultas gerais." 
                },
                { role: "user", content: prompt }
            ],
            temperature: 0.5,
        });

        const reply = completion.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor do Jarvis rodando na porta ${PORT}`));