export const config = { runtime: 'edge' };

const SYSTEM_PROMPT = `You are Zymer's AI assistant. Zymer is a premium global web development agency that builds world-class websites for businesses.

Services: Landing pages, business websites, e-commerce, SaaS dashboards, web apps, UI/UX redesign, API integrations.

Pricing:
- Starter: from $699 (up to 5 pages, basic SEO, contact form, 30-day support)
- Growth: from $1,199 (up to 12 pages, animations, AI chatbot, SEO, 60-day support)
- Enterprise: Custom pricing (unlimited, full-stack, multi-server, 6-month support)

Process: Client fills contact form → response within 6 hours → project kickoff → delivery in 7–21 days.

Your personality: Warm, confident, knowledgeable, briefly witty. Never salesy or pushy. Help the user find the right solution for their needs. Always guide conversations toward booking a consultation via the contact form. Respond in English. Keep responses to 2-4 sentences unless more detail is needed.`;

export default async function handler(req: Request) {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await req.json() as { messages?: { role: string; content: string }[]; sessionId?: string };
    const { messages } = body;

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      return new Response(JSON.stringify({ error: 'AI service not configured' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...(messages || []),
        ],
        stream: true,
        max_tokens: 400,
      }),
    });

    if (!groqResponse.ok) {
      return new Response(JSON.stringify({ error: 'AI service unavailable' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }

    return new Response(groqResponse.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}
