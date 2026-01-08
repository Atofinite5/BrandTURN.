import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configuration from environment
const APOLLO_API_KEY = process.env.APOLLO_API_KEY || 'aPGTuBCXGhwY8EPw2rWlpw';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const APOLLO_BASE_URL = 'https://api.apollo.io/v1';

// --- Apollo Routes ---

// Search People
router.post('/apollo/search/people', async (req, res) => {
    try {
        const { query } = req.body;
        
        console.log('Apollo People Search:', query);
        
        const response = await axios.post(`${APOLLO_BASE_URL}/mixed_people/search`, {
            api_key: APOLLO_API_KEY,
            q_keywords: query,
            page: 1,
            per_page: 15
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
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
        
        const response = await axios.post(`${APOLLO_BASE_URL}/mixed_companies/search`, {
            api_key: APOLLO_API_KEY,
            q_organization_name: query,
            page: 1,
            per_page: 15
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
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
                api_key: APOLLO_API_KEY,
                per_page: 100 
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });
        res.json(response.data.users || []);
    } catch (error: any) {
        console.warn('Apollo Users Error:', error.response?.data || error.message);
        res.json([]); 
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
