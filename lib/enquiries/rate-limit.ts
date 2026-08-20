import { createHash } from "node:crypto";

const WINDOW_MS = 10 * 60 * 1_000;
const MAX_ATTEMPTS = 4;
const GLOBAL_WINDOW_MS = 60 * 1_000;
const GLOBAL_MAX_ATTEMPTS = 40;
const MAX_TRACKED_CLIENTS = 2_000;

type RateEntry = { count: number; resetAt: number };

const attempts = new Map<string, RateEntry>();

function prune(now: number) {
  for (const [key, entry] of attempts) {
    if (entry.resetAt <= now) attempts.delete(key);
  }

  while (attempts.size >= MAX_TRACKED_CLIENTS) {
    const oldestKey = attempts.keys().next().value as string | undefined;
    if (!oldestKey) break;
    attempts.delete(oldestKey);
  }
}

export function clientRateKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0];
  const address = forwarded?.trim() || request.headers.get("x-real-ip") || "unknown";
  const agent = request.headers.get("user-agent") || "unknown";

  return createHash("sha256")
    .update(`${address}\u0000${agent}`)
    .digest("base64url");
}

function takeAttempt(
  key: string,
  maximum: number,
  windowMs: number,
  now: number,
) {
  prune(now);
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 } as const;
  }

  if (current.count >= maximum) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
    } as const;
  }

  current.count += 1;
  return { allowed: true, retryAfterSeconds: 0 } as const;
}

export function takeEnquiryAttempt(key: string, now = Date.now()) {
  return takeAttempt(`client:${key}`, MAX_ATTEMPTS, WINDOW_MS, now);
}

export function takeGlobalEnquiryAttempt(now = Date.now()) {
  return takeAttempt("global", GLOBAL_MAX_ATTEMPTS, GLOBAL_WINDOW_MS, now);
}

export function resetEnquiryRateLimitForTests() {
  if (process.env.NODE_ENV === "test") attempts.clear();
}
