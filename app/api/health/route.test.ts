import { describe, expect, it } from "vitest";

import { GET, runtime } from "./route";

describe("GET /api/health", () => {
  it("returns a no-store Node.js liveness response without dependency details", async () => {
    const response = GET();

    expect(runtime).toBe("nodejs");
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex, nofollow");
    await expect(response.json()).resolves.toEqual({ status: "ok" });
  });
});
