import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configuration from environment
const GROQ_API_KEY = process.env.GROQ_API_KEY || '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';



// --- General Chat Route ---

router.post('/ai/chat', async (req, res) => {
    if (!GROQ_API_KEY) {
        return res.json({
            content: `I'm sorry, but I'm currently unavailable. Please try again later.`
        });
    }

    try {
        const { message, context = 'general' } = req.body;

        let systemPrompt = '';
        if (context === 'admin') {
            systemPrompt = `You are Grow+, an intelligent AI assistant for BrandTURN's admin panel. You help with:
- Writing professional emails and communications
- Generating business ideas and strategies
- Marketing insights and campaign planning
- Learning new marketing techniques and trends
- Administrative tasks and productivity tips
Always be helpful, professional, and provide actionable advice. Sign responses as "Grow+ AI Assistant".`;
        } else if (context === 'landing') {
            systemPrompt = `You are G+, the AI executive assistant for BrandTURN, a creative marketing agency. You help visitors with:
- Understanding BrandTURN's services
- Getting suggestions for their marketing needs
- Redirecting to appropriate pages or contacts
- Providing quick answers about digital marketing
- Offering consultation guidance
Be friendly, professional, and helpful. Always represent BrandTURN positively. Sign responses as "G+ - BrandTURN Executive Assistant".`;
        } else {
            systemPrompt = `You are a helpful AI assistant. Provide clear, concise, and accurate responses.`;
        }

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
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 1000,
            }),
        });

        if (!response.ok) {
            throw new Error(`Groq API Error: ${response.statusText}`);
        }

        const data: any = await response.json();
        const content = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response right now.';

        res.json({ content });

    } catch (error: any) {
        console.error('Groq Chat Error:', error.message);
        res.json({
            content: `I apologize, but I'm experiencing technical difficulties. Please try again in a moment.`
        });
    }
});

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
