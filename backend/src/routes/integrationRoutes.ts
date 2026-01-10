import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configuration from environment
const GROQ_API_KEY = process.env.GROQ_API_KEY;



// --- Groq AI Route ---

router.post('/ai/generate', async (req, res) => {
    // If no Groq API key, return a helpful fallback
    if (!GROQ_API_KEY) {
        return res.json({ 
            content: `Strategy: Focus on decision-makers with budget authority in your target industry.\n\nKeywords: CEO, Marketing Director, VP Sales, Founder, Head of Growth` 
        });
    }

    try {
        const { systemPrompt, userPrompt } = req.body;

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-70b-versatile',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                temperature: 0.7,
                max_tokens: 1024,
            }),
        });

        if (!response.ok) {
             throw new Error(`Groq API Error: ${response.statusText}`);
        }
        
        const data: any = await response.json();
        const content = data.choices[0]?.message?.content || 'Unable to generate response';
        
        res.json({ content });

    } catch (error: any) {
        console.error('Groq AI Error:', error.message);
        // Fallback response
        res.json({ 
            content: `Strategy: Target professionals in leadership roles within your specified industry.\n\nKeywords: Director, Manager, VP, C-Suite, Lead` 
        });
    }
});

export default router;
