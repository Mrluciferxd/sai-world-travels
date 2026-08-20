// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import Home from "./page";

vi.mock("next/image", () => ({
  default: ({ alt, priority, ...props }: React.ComponentProps<"img"> & { priority?: boolean }) => {
    void priority;

    return (
    // This test verifies rendered content; Next.js image optimization is covered by the production build.
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} {...props} />
    );
  },
}));

afterEach(cleanup);

describe("home page foundation", () => {
  it("explains the referral-led personalised travel model", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", { name: /a holiday shaped around you/i }),
    ).toBeTruthy();
    expect(
      screen.getByText(/welcoming travellers referred by our past clients/i),
    ).toBeTruthy();
    expect(screen.getByText(/plans, arranges, and manages/i)).toBeTruthy();
  });

  it("offers accessible navigation and enquiry calls to action", () => {
    render(<Home />);

    expect(screen.getByRole("navigation", { name: /main navigation/i })).toBeTruthy();

    const planningLinks = screen.getAllByRole("link", {
      name: /plan(?:ning)? your journey|start planning your journey/i,
    });

    expect(planningLinks.length).toBeGreaterThanOrEqual(2);
    expect(planningLinks.some((link) => link.getAttribute("href") === "#contact")).toBe(true);
  });

  it("keeps every in-page navigation target connected to rendered content", () => {
    const { container } = render(<Home />);
    const inPageLinks = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    );

    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(inPageLinks.length).toBeGreaterThan(0);

    for (const link of inPageLinks) {
      expect(container.querySelector(link.hash)).toBeTruthy();
    }
  });

  it("keeps the enquiry action unavailable until official details are ready", () => {
    render(<Home />);

    const enquiryButton = screen.getByRole("button", {
      name: /start planning your journey/i,
    });

    expect(enquiryButton.hasAttribute("disabled")).toBe(true);
    expect(screen.getByText(/official details to be confirmed/i)).toBeTruthy();
  });

  it("exposes the journey folio copy without labelling a generic container", () => {
    const { container } = render(<Home />);

    expect(
      screen.getByText(/from a first idea to a beautiful return/i),
    ).toBeTruthy();
    expect(container.querySelector(".hero-visual")?.hasAttribute("aria-label")).toBe(
      false,
    );
  });

  it("presents inspiration without fixed package pricing", () => {
    const { container } = render(<Home />);
    const journeyRows = Array.from(container.querySelectorAll(".journey-types li"));

    expect(screen.getByText("Family escapes")).toBeTruthy();
    expect(screen.getByText("Honeymoons")).toBeTruthy();
    expect(journeyRows).not.toHaveLength(0);
    expect(journeyRows.every((row) => row.querySelector("a, button, svg") === null)).toBe(
      true,
    );
    expect(container.textContent).not.toMatch(/book now|starting from|₹/i);
  });
});
