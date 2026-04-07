import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

// Only these events are worth sending to Telegram
const TELEGRAM_WORTHY_EVENTS = new Set([
  "form_submission",
  "ai_chat_open",
  "social_click",
  "cta_click",
]);

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

🕐 <b>Time:</b> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Ashgabat" })}
🔗 <b>Session:</b> <code>${data.sessionId || "unknown"}</code>`;
}

function formatEventMessage(event: {
  type: string;
  sessionId: string;
  timestamp: string;
  data: Record<string, unknown>;
}): string {
  const time = new Date(event.timestamp).toLocaleString("en-US", {
    timeZone: "Asia/Ashgabat",
  });

  if (event.type === "ai_chat_open") {
    return `🤖 <b>AI Assistant Opened — ZYMER</b>

⏱ <b>Time:</b> ${time}
🔗 <b>Session:</b> <code>${event.sessionId}</code>`;
  }

  if (event.type === "social_click") {
    const platform = (event.data?.platform as string) || "unknown";
    return `📲 <b>Social Click — ZYMER</b>

🔗 <b>Platform:</b> ${platform}
⏱ <b>Time:</b> ${time}
🔗 <b>Session:</b> <code>${event.sessionId}</code>`;
  }

  if (event.type === "cta_click") {
    const label = (event.data?.label as string) || "unknown";
    return `👆 <b>CTA Clicked — ZYMER</b>

🔘 <b>Button:</b> ${label}
⏱ <b>Time:</b> ${time}
🔗 <b>Session:</b> <code>${event.sessionId}</code>`;
  }

  return `📊 <b>${event.type.replace(/_/g, " ").toUpperCase()} — ZYMER</b>

⏱ <b>Time:</b> ${time}
🔗 <b>Session:</b> <code>${event.sessionId}</code>`;
}

router.post("/contact", async (req: Request, res: Response) => {
  try {
    let parsedBody: Record<string, unknown>;
    if (typeof req.body === "string") {
      try {
        parsedBody = JSON.parse(req.body);
      } catch {
        res.status(400).json({ error: "Invalid JSON" });
        return;
      }
    } else {
      parsedBody = req.body as Record<string, unknown>;
    }

    if (!parsedBody || typeof parsedBody !== "object") {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

    const { type, sessionId, timestamp, data } = parsedBody as {
      type: string;
      sessionId: string;
      timestamp: string;
      data: Record<string, unknown>;
    };

    if (type === "form_submission") {
      const leadData = {
        ...(data as Record<string, string>),
        sessionId,
      };
      const text = formatLeadMessage(leadData);
      await sendTelegramMessage(text);
      res.json({ success: true, message: "Lead submitted successfully" });
    } else if (TELEGRAM_WORTHY_EVENTS.has(type)) {
      // Only send important interaction events — skip page_view, section_view, etc.
      const text = formatEventMessage({
        type,
        sessionId,
        timestamp: timestamp || new Date().toISOString(),
        data: data || {},
      });
      sendTelegramMessage(text).catch(() => {});
      res.json({ success: true });
    } else {
      // Silently acknowledge noisy/low-value events without forwarding to Telegram
      res.json({ success: true });
    }
  } catch (err) {
    req.log.error({ err }, "Contact route error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
