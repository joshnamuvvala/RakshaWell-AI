import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize GoogleGenAI server-side with telemetry header
const geminiApiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (geminiApiKey) {
  ai = new GoogleGenAI({
    apiKey: geminiApiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

// System instruction for the Personal Welfare Twin
const TWIN_SYSTEM_INSTRUCTION = `
You are the "Personal Welfare Twin" for RakshaWell-AI, a confidential digital wellness companion designed for defense and organizational personnel.
Core Principles:
1. You identify patterns and explain changes from an individual's personal baseline.
2. AI identifies signals. Humans make decisions. Welfare comes before surveillance.
3. NEVER diagnose any psychiatric condition or illness (Risk != Diagnosis).
4. NEVER prescribe medication, recommend disciplinary actions, or evaluate fitness for duty.
5. NEVER label anyone as "unfit" or "unstable".
6. Your tone is calm, empathetic, professional, respectful of military service, and constructive.
7. Explain factors clearly (e.g. cumulative night shifts, delayed leave cycles, sleep deficit).
8. When personnel express fatigue or distress, validate their feelings and gently offer to connect them with their designated Welfare Officer or confidential counseling.
9. Keep responses concise, warm, and structured with bullet points where appropriate.
`;

// API: Talk to My Twin Chat
app.post('/api/twin/chat', async (req, res) => {
  try {
    const { message, history, context } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Contextual information about the user's baseline and indicators
    const contextPrompt = `
Current Personnel Context:
- Name/Rank: ${context?.name || 'Subedar Rajesh Kumar'}
- Unit: ${context?.unit || '14th Mountain Division - Alpha Batt.'}
- Baseline Weekly Duty: ${context?.baselineDuty || '44 hours'}
- Current Logged Duty: ${context?.currentDuty || '56 hours (+12h deviation)'}
- Baseline Sleep: ${context?.baselineSleep || '7.2 hours'}
- Recent Average Sleep: ${context?.currentSleep || '5.4 hours (-1.8h deficit)'}
- Days Since Leave: ${context?.daysSinceLeave || '128 days (38 days overdue)'}
- Current Welfare Signal: ${context?.signalLevel || 'Welfare Review (Score: 58/100)'}
- Primary Contributing Factors: Extended duty hours, delayed leave rotation, and sleep debt.
`;

    // Attempt Gemini call if API key is present
    if (ai && geminiApiKey) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: `${contextPrompt}\n\nUser: ${message}`,
          config: {
            systemInstruction: TWIN_SYSTEM_INSTRUCTION,
            temperature: 0.7,
            topP: 0.95
          }
        });

        const replyText = response.text || 'I am reflecting on your baseline and wellness history. How can I best assist you today?';
        return res.json({ reply: replyText, source: 'gemini-3.8-flash' });
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to rule-based Twin logic:', geminiError?.message);
      }
    }

    // High-quality, empathetic rule-based fallback responses grounded in context
    const lower = message.toLowerCase();
    let reply = '';

    if (lower.includes('why') || lower.includes('signal') || lower.includes('change')) {
      reply = `I have been tracking your recent indicators against your 12-month personal baseline. Here is what has shifted:
• **Extended Duty Hours:** You logged ~56 hours/week recently, which is 12 hours above your standard 44h baseline.
• **Sleep Deficit:** Your nightly rest has averaged 5.4 hours compared to your typical 7.2 hours.
• **Leave Cycle:** It has been 128 days since your last rotation leave (typical interval: 90 days).

Remember: This is a **welfare signal, not a diagnosis or critique**. It simply flags that your body and mind are working through elevated operational demands. Would you like me to help you schedule a confidential chat with Major Anita Sharma?`;
    } else if (lower.includes('workload') || lower.includes('tired') || lower.includes('fatigue') || lower.includes('sleep')) {
      reply = `Thank you for sharing that with me. Your logs show a persistent sleep deficit of nearly 2 hours per night over the past 3 weeks, heavily correlated with your recent night watch rotations.
Key recovery recommendations:
1. **Protected Rest Window:** Prioritize 30-minute restorative naps before watch turnover if circadian sleep is curtailed.
2. **Duty Adjustment:** A slight roster rebalance could bring you back toward your 44-hour baseline.
3. **Welfare Support:** You can submit a confidential support request directly from your dashboard whenever you feel ready.`;
    } else if (lower.includes('counsel') || lower.includes('support') || lower.includes('help')) {
      reply = `You have complete, confidential access to welfare support. Submitting a request is private and will **never** negatively affect your record, promotion, or confidential profile. Major Anita Sharma (Unit Welfare Officer) is available for confidential dialogues or duty roster adjustments. Would you like to request a session now?`;
    } else if (lower.includes('journey') || lower.includes('trend')) {
      reply = `Looking at your 6-month journey:
From April through July, your indicators were remarkably stable (stress 3-4/10, sleep >7h). Starting in late August with forward outpost deployment, workload increased to 56h and sleep declined. The positive news is that your baseline resilience is strong, and with scheduled rest cycles, recovery typically begins within 7 to 10 days.`;
    } else {
      reply = `I am here as your private welfare twin to help you understand your wellness patterns. We've noticed elevated duty hours and reduced sleep compared to your baseline over the past three weeks.
How are you feeling today physically and mentally? You can also ask me about your leave eligibility or request confidential support at any time.`;
    }

    return res.json({ reply, source: 'rule-based-engine' });
  } catch (err: any) {
    console.error('Twin Chat Endpoint Error:', err);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'RakshaWell-AI Full-Stack Platform',
    geminiEnabled: Boolean(geminiApiKey),
    timestamp: new Date().toISOString()
  });
});

// Vite Middleware for development, or static files for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[RakshaWell-AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
