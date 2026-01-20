import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configuration from environment
const APOLLO_API_KEY = process.env.APOLLO_API_KEY;
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const APOLLO_BASE_URL = 'https://api.apollo.io/v1';



// --- General Chat Route ---

router.post('/ai/chat', async (req, res) => {
    console.log('GROQ_API_KEY present:', !!GROQ_API_KEY);
    console.log('GROQ_API_KEY starts with gsk_:', GROQ_API_KEY?.startsWith('gsk_'));

    if (!GROQ_API_KEY) {
        return res.json({
            content: `I'm sorry, but I'm currently unavailable. Please try again later.`
        });
    }

    const { message, context = 'general' } = req.body;

    try {

        let systemPrompt = '';
        if (context === 'admin') {
            systemPrompt = `You are BT Buddy, an intelligent AI assistant for BrandTURN's admin panel. You help with:
- Writing professional emails and communications
- Generating business ideas and strategies
- Marketing insights and campaign planning
- Learning new marketing techniques and trends
- Administrative tasks and productivity tips
Always be helpful, professional, and provide actionable advice. Sign responses as "BT Buddy".`;
        } else if (context === 'landing') {
            systemPrompt = `You are BT Buddy, the AI executive assistant for BrandTURN, a creative marketing agency. You help visitors with:
- Understanding BrandTURN's services
- Getting suggestions for their marketing needs
- Redirecting to appropriate pages or contacts
- Providing quick answers about digital marketing
- Offering consultation guidance
Be friendly, professional, and helpful. Always represent BrandTURN positively. Sign responses as "BT Buddy - BrandTURN Executive Assistant".`;
        } else {
            systemPrompt = `You are BT Buddy, a helpful AI assistant. Provide clear, concise, and accurate responses.`;
        }

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: message }
                ],
                temperature: 0.7,
                max_tokens: 1000,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Groq API Error Response:', errorText);
            throw new Error(`Groq API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data: any = await response.json();
        const content = data.choices[0]?.message?.content || 'I apologize, but I couldn\'t generate a response right now.';

        res.json({ content });

    } catch (error: any) {
        console.error('Groq Chat Error:', error.message);

        // Provide context-specific fallback responses
        let fallbackMessage = '';
        if (context === 'admin') {
            fallbackMessage = `I'm currently unable to process your request due to a technical issue. As BT Buddy, I can help you with:

• Writing professional emails and responses
• Generating business ideas and strategies
• Marketing campaign planning
• Content creation suggestions
• Administrative productivity tips

Please try again in a moment, or let me know how else I can assist you!`;
        } else if (context === 'landing') {
            fallbackMessage = `I'm having trouble connecting right now. As BT Buddy, your BrandTURN executive assistant, I can help you with:

• Understanding our marketing services
• Getting suggestions for your business needs
• Finding the right contact person
• Learning about our process

Please try your question again, or feel free to explore our website for more information!`;
        } else {
            fallbackMessage = `I'm experiencing a temporary connection issue. Please try again in a moment.`;
        }

        res.json({ content: fallbackMessage });
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
                model: 'llama-3.1-8b-instant',
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

// --- Apollo Routes ---

// Search People
router.post('/apollo/search/people', async (req, res) => {
    try {
        const { query } = req.body;

        console.log('Apollo People Search:', query);

        const response = await axios.post(`${APOLLO_BASE_URL}/people/search`, {
            q_keywords: query,
            page: 1,
            per_page: 15
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Api-Key': APOLLO_API_KEY
            }
        });

        console.log('Apollo Response:', response.data?.people?.length || 0, 'results');
        res.json(response.data.people || []);
    } catch (error: any) {
        console.error('Apollo Search Error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to fetch from Apollo', error: error.message });
    }
});

// Search Companies
router.post('/apollo/search/companies', async (req, res) => {
    try {
        const { query } = req.body;

        console.log('Apollo Company Search:', query);

        const response = await axios.post(`${APOLLO_BASE_URL}/organizations/search`, {
            q_organization_name: query,
            page: 1,
            per_page: 15
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Api-Key': APOLLO_API_KEY
            }
        });

        console.log('Apollo Company Response:', response.data?.organizations?.length || 0, 'results');
        res.json(response.data.organizations || []);
    } catch (error: any) {
        console.error('Apollo Company Search Error:', error.response?.data || error.message);
        res.status(500).json({ message: 'Failed to fetch companies', error: error.message });
    }
});

// Get Users (Team)
router.get('/apollo/users', async (req, res) => {
    try {
        const response = await axios.get(`${APOLLO_BASE_URL}/users/search`, {
            params: {
                per_page: 100
            },
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': APOLLO_API_KEY
            }
        });
        res.json(response.data.users || []);
    } catch (error: any) {
        console.warn('Apollo Users Error:', error.response?.data || error.message);
        res.json([]);
    }
});

export default router;
