// Helper to broadcast events via the realtime Socket.io service
// Server-side only — uses localhost since both services are internal

const REALTIME_PORT = 3003;

export async function broadcast(event: string, payload: Record<string, unknown> = {}) {
  try {
    await fetch(`http://localhost:${REALTIME_PORT}/broadcast`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event, payload }),
    });
  } catch (err) {
    // Realtime service is optional — don't block if it's down
    console.warn('[Realtime] Broadcast failed:', err);
  }
}