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

function formatLeadMessage(data: Record<string, string>, sessionId: string): string {
  const time = new Date().toLocaleString("en-US", { timeZone: "Asia/Ashgabat" });

  const lines = [
    `🚀 <b>Zymer Agent — YANGI MIJOZ</b>`,
    ``,
    `👤 <b>Ism:</b> ${data.name || "N/A"}`,
    `🏢 <b>Biznes:</b> ${data.business || data.businessName || "N/A"}`,
    `📞 <b>Telefon:</b> ${data.phone || "N/A"}`,
    `📧 <b>Email:</b> ${data.email || "N/A"}`,
    ``,
    `📦 <b>Paket:</b> ${data.package || data.plan || "N/A"}`,
    `🎨 <b>Dizayn stili:</b> ${data.style || data.designStyle || "N/A"}`,
    `💬 <b>Xabar:</b> ${data.message || "N/A"}`,
  ];

  if (data.url || data.website) lines.push(`🌐 <b>Joriy sayt:</b> ${data.url || data.website}`);
  if (data.budget) lines.push(`💰 <b>Byudjet:</b> ${data.budget}`);
  if (data.deadline) lines.push(`⏱ <b>Muddat:</b> ${data.deadline}`);
  if (data.source) lines.push(`📣 <b>Qayerdan topdi:</b> ${data.source}`);

  lines.push(``);
  lines.push(`🕐 <b>Vaqt:</b> ${time}`);
  lines.push(`🔗 <b>Sessiya:</b> <code>${sessionId || "unknown"}</code>`);

  return lines.join("\n");
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

    const { type, sessionId, data } = parsedBody as {
      type: string;
      sessionId: string;
      data: Record<string, unknown>;
    };

    if (type === "form_submission") {
      const text = formatLeadMessage(data as Record<string, string>, sessionId);
      await sendTelegramMessage(text);
      res.json({ success: true, message: "Lead submitted successfully" });
    } else {
      res.json({ success: true });
    }
  } catch (err) {
    req.log.error({ err }, "Contact route error");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
