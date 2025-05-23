// backend/routes/codeBot.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/generate-code', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions', 
      {
        // model: 'gpt-4',  // Or use 'gpt-3.5-turbo'
        model: 'gpt-4o-mini',  // Or use 'gpt-3.5-turbo'
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
        temperature: 0.5
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    res.json({ code: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error generating code:', error);
    res.status(500).json({ error: 'Failed to generate code' });
  }
});

module.exports = router;
