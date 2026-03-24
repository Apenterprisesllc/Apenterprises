import type { VercelRequest, VercelResponse } from "@vercel/node";
import { randomUUID } from "node:crypto";

type RumEventType = "web-vital" | "quote-submit" | "client-error";

interface RumEvent {
  type: RumEventType;
  [key: string]: unknown;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const payload = req.body as RumEvent | undefined;
  if (!payload?.type) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const requestId = randomUUID();
  const logPayload = {
    requestId,
    type: payload.type,
    page: payload.page ?? "unknown",
    value: payload.value,
    metric: payload.metric,
    durationMs: payload.durationMs,
    status: payload.status,
    message: payload.message,
    ts: payload.ts ?? Date.now(),
  };

  console.log("[RUM]", JSON.stringify(logPayload));

  return res.status(202).json({ success: true, requestId });
}

