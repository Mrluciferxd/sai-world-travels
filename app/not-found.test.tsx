// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import NotFound from "./not-found";

vi.mock("next/image", () => ({
  default: ({ alt, priority, ...props }: React.ComponentProps<"img"> & { priority?: boolean }) => {
    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
}));

afterEach(cleanup);

describe("Not Found route", () => {
  it("renders one claim-safe heading and a focusable main landmark", () => {
    render(<NotFound />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /this page is outside the current route/i,
      }),
    ).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("main").getAttribute("id")).toBe("not-found-main");
    expect(screen.getByRole("main").getAttribute("tabindex")).toBe("-1");
    expect(screen.queryByText(/folio|journey index/i)).toBeNull();
    expect(screen.getByRole("link", { name: "Skip to main content" }).getAttribute("href")).toBe(
      "#not-found-main",
    );
  });

  it("offers real recovery links and the complete mobile menu", () => {
    render(<NotFound />);

    expect(screen.getByRole("link", { name: "Return home" }).getAttribute("href")).toBe("/");
    expect(
      screen.getByRole("link", { name: "Start planning your journey" }).getAttribute("href"),
    ).toBe("/plan-your-journey");
    expect(screen.getByRole("navigation", { name: "Main navigation mobile" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "01 — How we work" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "02 — Travel inspiration" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "03 — About" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "04 — Plan your journey" })).toBeTruthy();
  });
});
