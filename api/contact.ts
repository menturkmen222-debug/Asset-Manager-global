import type { VercelRequest, VercelResponse } from '@vercel/node';

const TELEGRAM_WORTHY_EVENTS = new Set([
  'form_submission',
  'ai_chat_open',
  'social_click',
  'cta_click',
]);

async function sendTelegramMessage(text: string): Promise<{ ok: boolean; error?: string }> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const userId1 = process.env.TELEGRAM_USER_ID_1;
  const userId2 = process.env.TELEGRAM_USER_ID_2;

  if (!token) return { ok: false, error: 'TELEGRAM_BOT_TOKEN not set' };

  const userIds = [userId1, userId2].filter(Boolean);
  if (userIds.length === 0) return { ok: false, error: 'No TELEGRAM_USER_ID set' };

  const results = await Promise.all(
    userIds.map((chatId) =>
      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      })
        .then((r) => r.json())
        .catch((err) => ({ ok: false, error: String(err) })),
    ),
  );

  const failed = results.filter((r: any) => !r.ok);
  if (failed.length > 0) {
    return { ok: false, error: JSON.stringify(failed) };
  }

  return { ok: true };
}

function formatLeadMessage(data: Record<string, string>): string {
  return `🚀 <b>NEW LEAD — ZYMER</b>

👤 <b>Name:</b> ${data.name || 'N/A'}
🏢 <b>Business:</b> ${data.businessName || data.business || 'N/A'}
📞 <b>Phone:</b> ${data.phone || 'N/A'}
📧 <b>Email:</b> ${data.email || 'N/A'}

📦 <b>Package:</b> ${data.plan || data.package || 'N/A'}
🎨 <b>Design Style:</b> ${data.designStyle || data.style || 'N/A'}
💬 <b>Message:</b> ${data.message || 'N/A'}

${data.website || data.url ? `🌐 <b>Current Site:</b> ${data.website || data.url}` : ''}
${data.budget ? `💰 <b>Budget:</b> ${data.budget}` : ''}
${data.deadline ? `⏱ <b>Deadline:</b> ${data.deadline}` : ''}
${data.source ? `📣 <b>Found us via:</b> ${data.source}` : ''}

🕐 <b>Time:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Ashgabat' })}
🔗 <b>Session:</b> <code>${data.sessionId || 'unknown'}</code>`;
}

function formatEventMessage(event: {
  type: string;
  sessionId: string;
  timestamp: string;
  data: Record<string, unknown>;
}): string {
  const time = new Date(event.timestamp).toLocaleString('en-US', {
    timeZone: 'Asia/Ashgabat',
  });

  if (event.type === 'ai_chat_open') {
    return `🤖 <b>AI Assistant Opened — ZYMER</b>

⏱ <b>Time:</b> ${time}
🔗 <b>Session:</b> <code>${event.sessionId}</code>`;
  }

  if (event.type === 'social_click') {
    const platform = (event.data?.platform as string) || 'unknown';
    return `📲 <b>Social Click — ZYMER</b>

🔗 <b>Platform:</b> ${platform}
⏱ <b>Time:</b> ${time}
🔗 <b>Session:</b> <code>${event.sessionId}</code>`;
  }

  if (event.type === 'cta_click') {
    const label = (event.data?.label as string) || 'unknown';
    return `👆 <b>CTA Clicked — ZYMER</b>

🔘 <b>Button:</b> ${label}
⏱ <b>Time:</b> ${time}
🔗 <b>Session:</b> <code>${event.sessionId}</code>`;
  }

  return `📊 <b>${event.type.replace(/_/g, ' ').toUpperCase()} — ZYMER</b>

⏱ <b>Time:</b> ${time}
🔗 <b>Session:</b> <code>${event.sessionId}</code>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    let parsedBody: Record<string, unknown>;
    if (typeof req.body === 'string') {
      try {
        parsedBody = JSON.parse(req.body);
      } catch {
        return res.status(400).json({ error: 'Invalid JSON' });
      }
    } else {
      parsedBody = req.body as Record<string, unknown>;
    }

    if (!parsedBody || typeof parsedBody !== 'object') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const { type, sessionId, timestamp, data } = parsedBody as {
      type: string;
      sessionId: string;
      timestamp: string;
      data: Record<string, unknown>;
    };

    if (type === 'form_submission') {
      const leadData = {
        ...(data as Record<string, string>),
        sessionId,
      };
      const text = formatLeadMessage(leadData);
      const result = await sendTelegramMessage(text);
      if (!result.ok) {
        console.error('[Zymer] Telegram send failed:', result.error);
        return res.status(500).json({ error: 'Failed to deliver notification', detail: result.error });
      }
      return res.json({ success: true, message: 'Lead submitted successfully' });
    } else if (TELEGRAM_WORTHY_EVENTS.has(type)) {
      const text = formatEventMessage({
        type,
        sessionId,
        timestamp: timestamp || new Date().toISOString(),
        data: data || {},
      });
      sendTelegramMessage(text).catch((err) => console.error('[Zymer] Telegram event failed:', err));
      return res.json({ success: true });
    } else {
      return res.json({ success: true });
    }
  } catch (err) {
    console.error('[Zymer] Contact handler error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
