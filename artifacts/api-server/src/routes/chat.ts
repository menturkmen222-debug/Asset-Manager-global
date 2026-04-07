import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

const SYSTEM_PROMPT = `You are Zymer's AI assistant. Zymer is a premium global web development agency that builds world-class websites for businesses.

Services: Landing pages, business websites, e-commerce, SaaS dashboards, web apps, UI/UX redesign, API integrations.

Pricing:
- Starter: from $699 (up to 5 pages, basic SEO, contact form, 30-day support)
- Growth: from $1,199 (up to 12 pages, animations, AI chatbot, SEO, 60-day support)
- Enterprise: Custom pricing (unlimited, full-stack, multi-server, 6-month support)

Process: Client fills contact form → response within 6 hours → project kickoff → delivery in 7–21 days.

Your personality: Warm, confident, knowledgeable, briefly witty. Never salesy or pushy. Help the user find the right solution for their needs. Always guide conversations toward booking a consultation via the contact form. Respond in English. Keep responses to 2-4 sentences unless more detail is needed.`;

router.post("/chat", async (req: Request, res: Response) => {
  try {
    const { messages, sessionId } = req.body;

    const groqApiKey = process.env.GROQ_API_KEY;
    if (!groqApiKey) {
      res.status(503).json({ error: "AI service not configured" });
      return;
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${groqApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...(messages || []),
          ],
          stream: true,
          max_tokens: 400,
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      req.log.error({ status: response.status, error: errorText }, "Groq API error");
      res.status(502).json({ error: "AI service unavailable" });
      return;
    }

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        res.write(chunk);
      }
    } finally {
      reader.releaseLock();
    }

    res.end();

    // Fire analytics event (non-blocking)
    sendAnalyticsEvent({
      type: "ai_chat_message",
      sessionId: sessionId || "unknown",
      timestamp: new Date().toISOString(),
      data: { messageCount: (messages || []).length },
    }).catch(() => {});
  } catch (err) {
    req.log.error({ err }, "Chat route error");
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
});

async function sendAnalyticsEvent(event: {
  type: string;
  sessionId: string;
  timestamp: string;
  data: Record<string, unknown>;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const userId1 = process.env.TELEGRAM_USER_ID_1;
  const userId2 = process.env.TELEGRAM_USER_ID_2;

  if (!token) return;

  const userIds = [userId1, userId2].filter(Boolean);
  if (userIds.length === 0) return;

  const text = `📊 <b>ANALYTICS — ZYMER</b>

🔔 <b>Event:</b> ${event.type}
⏱ <b>Time:</b> ${new Date(event.timestamp).toLocaleString("en-US", { timeZone: "Asia/Ashgabat" })}
📱 <b>Session:</b> <code>${event.sessionId}</code>
📋 <b>Details:</b> <pre>${JSON.stringify(event.data, null, 2)}</pre>`;

  await Promise.all(
    userIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }).catch(() => {}),
    ),
  );
}

export { sendAnalyticsEvent };
export default router;
