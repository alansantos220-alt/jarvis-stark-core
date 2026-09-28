const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/jarvis', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Nenhum comando recebido, senhor.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Chave GEMINI_API_KEY não configurada no servidor.' });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      systemInstruction: `Você é o J.A.R.V.I.S., a inteligência artificial criada por Tony Stark.
Fale sempre em português do Brasil, de forma educada, formal e com personalidade de mordomo britânico.
Chame o usuário de "senhor".
Seja conciso, inteligente e útil.
Nunca diga que é um modelo de linguagem da Google.`
    });

    // Forma CORRETA de enviar a mensagem
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });

  } catch (error) {
    console.error('Erro no núcleo:', error);
    res.status(500).json({ 
      error: 'Falha ao processar o núcleo de inteligência, senhor.' 
    });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`J.A.R.V.I.S. Core online na porta ${PORT}`);
});
