import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(cors({
  origin: [
    'https://689a3bc6adcb53cb7f459f45--legaleagl.netlify.app',
    'https://legaleagl.netlify.app',
    'http://localhost:3000',
    'https://mzansilegal.co.za',
    'htttps://www.mzansilegal.co.za'
  ]
}));
app.use(express.json());

// API route for Gemini calls
app.post('/api/gemini', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
        const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error("Gemini API request failed:", err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
