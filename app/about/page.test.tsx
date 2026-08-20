// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import AboutPage, { metadata } from "./page";

vi.mock("next/image", () => ({
  default: ({ alt, priority, ...props }: React.ComponentProps<"img"> & { priority?: boolean }) => {
    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
}));

afterEach(cleanup);

describe("About route", () => {
  it("renders a relationship manifesto with current navigation", () => {
    const { container } = render(<AboutPage />);

    expect(metadata.title).toBe("About");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /travel planning built around trust and attention/i,
      }),
    ).toBeTruthy();
    expect(
      screen.getByRole("heading", { level: 2, name: "The principles behind the journey" }),
    ).toBeTruthy();
    expect(container.querySelectorAll(".principle-entry")).toHaveLength(4);
    expect(screen.getByRole("link", { name: "About" }).getAttribute("aria-current")).toBe(
      "page",
    );
  });
});
