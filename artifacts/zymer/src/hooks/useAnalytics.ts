import { useRef } from 'react';

function generateSessionId() {
  if (typeof window === 'undefined') return 'unknown';
  let id = sessionStorage.getItem('zymer_session_id');
  if (!id) {
    id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem('zymer_session_id', id);
  }
  return id;
}

export function useAnalytics() {
  const sessionId = useRef(generateSessionId());

  const trackEvent = (type: string, data?: Record<string, unknown>) => {
    const payload = {
      type,
      sessionId: sessionId.current,
      timestamp: new Date().toISOString(),
      data,
    };

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/contact', JSON.stringify(payload));
      } else {
        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Ignore
    }
  };

  return { trackEvent, sessionId: sessionId.current };
}
