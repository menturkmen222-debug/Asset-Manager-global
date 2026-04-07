import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const userId1 = process.env.TELEGRAM_USER_ID_1;
  const userId2 = process.env.TELEGRAM_USER_ID_2;

  if (!token) return;

  const userIds = [userId1, userId2].filter(Boolean);
  if (userIds.length === 0) return;

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

function formatLeadMessage(data: Record<string, string>): string {
  return `🚀 <b>NEW LEAD — ZYMER</b>

👤 <b>Name:</b> ${data.name || "N/A"}
🏢 <b>Business:</b> ${data.businessName || "N/A"}
📞 <b>Phone:</b> ${data.phone || "N/A"}
📧 <b>Email:</b> ${data.email || "N/A"}

📦 <b>Package:</b> ${data.plan || "N/A"}
🎨 <b>Design Style:</b> ${data.designStyle || "N/A"}
💬 <b>Message:</b> ${data.message || "N/A"}

${data.website ? `🌐 <b>Current Site:</b> ${data.website}` : ""}
${data.budget ? `💰 <b>Budget:</b> ${data.budget}` : ""}
${data.deadline ? `⏱ <b>Deadline:</b> ${data.deadline}` : ""}
${data.source ? `📣 <b>Found us via:</b> ${data.source}` : ""}

🕐 <b>Submitted:</b> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Ashgabat" })}
🔗 <b>Session:</b> <code>${data.sessionId || "unknown"}</code>`;
}

function formatAnalyticsMessage(event: {
  type: string;
  sessionId: string;
  timestamp: string;
  data: Record<string, unknown>;
}): string {
  return `📊 <b>ANALYTICS — ZYMER</b>

🔔 <b>Event:</b> ${event.type}
⏱ <b>Time:</b> ${new Date(event.timestamp).toLocaleString("en-US", { timeZone: "Asia/Ashgabat" })}
📱 <b>Session:</b> <code>${event.sessionId}</code>
📋 <b>Details:</b> <pre>${JSON.stringify(event.data, null, 2).slice(0, 3000)}</pre>`;
}

router.post("/api/contact", async (req: Request, res: Response) => {
  try {
    const body = req.body as {
      type: string;
      sessionId: string;
      timestamp: string;
      data: Record<string, unknown>;
    };

    const { type, sessionId, timestamp, data } = body;

    if (type === "form_submission") {
      const leadData = {
        ...(data as Record<string, string>),
        sessionId,
      };
      const text = formatLeadMessage(leadData);
      await sendTelegramMessage(text);
      res.json({ success: true, message: "Lead submitted successfully" });
    } else {
      // Analytics event — fire and forget
      const text = formatAnalyticsMessage({
        type,
        sessionId,
        timestamp: timestamp || new Date().toISOString(),
        data: data || {},
      });
      sendTelegramMessage(text).catch(() => {});
      res.json({ success: true });
    }
  } catch (err) {
    req.log.error({ err }, "Contact route error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
