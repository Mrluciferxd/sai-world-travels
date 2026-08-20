// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import HowWeWorkPage, { metadata } from "./page";

vi.mock("next/image", () => ({
  default: ({ alt, priority, ...props }: React.ComponentProps<"img"> & { priority?: boolean }) => {
    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
}));

afterEach(cleanup);

describe("How We Work route", () => {
  it("renders a process dossier with current navigation and unique metadata", () => {
    const { container } = render(<HowWeWorkPage />);

    expect(metadata.title).toBe("How We Work");
    expect(metadata.alternates?.canonical).toBe("/how-we-work");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /a personal route, shaped one conversation at a time/i,
      }),
    ).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "The personal route" })).toBeTruthy();
    expect(container.querySelectorAll(".process-entry")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "How we work" }).getAttribute("aria-current")).toBe(
      "page",
    );
  });
});
