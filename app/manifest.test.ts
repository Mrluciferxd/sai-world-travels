import { describe, expect, it } from "vitest";

import manifest from "./manifest";

describe("web manifest", () => {
  it("uses only verified brand and local asset details", () => {
    const result = manifest();

    expect(result).toMatchObject({
      name: "Sai World Travels",
      short_name: "Sai World Travels",
      start_url: "/",
      display: "browser",
      icons: [
        {
          src: "/brand/sai-world-logo.jpeg",
          sizes: "200x200",
          type: "image/jpeg",
        },
      ],
    });
  });

  it("keeps its description referral-led and free of package commerce", () => {
    const description = manifest().description ?? "";

    expect(description).toMatch(/introduced through.*trusted client network/i);
    expect(description).not.toMatch(/book now|fixed package|starting from|discount|₹/i);
  });
});
