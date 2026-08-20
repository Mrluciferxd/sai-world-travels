// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { InteriorPage } from "./interior-page";

vi.mock("next/image", () => ({
  default: ({ alt, priority, ...props }: React.ComponentProps<"img"> & { priority?: boolean }) => {
    void priority;

    return (
      // The production smoke test covers Next.js image optimization.
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt} {...props} />
    );
  },
}));

afterEach(cleanup);

function renderInteriorPage() {
  return render(
    <InteriorPage
      activeHref="/how-we-work"
      emphasizedTitle="personally considered."
      eyebrow="The private journey"
      folioNumber="02"
      intro="A supplied introduction for this route."
      sectionAriaLabel="Route details"
      title="Every detail,"
    >
      <article>
        <h2>Supplied child content</h2>
        <p>Child copy remains owned by the route.</p>
      </article>
    </InteriorPage>,
  );
}

describe("InteriorPage", () => {
  it("renders the route heading, folio marker, introduction, and children", () => {
    renderInteriorPage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /every detail, personally considered\./i,
      }),
    ).toBeTruthy();
    expect(screen.getByText("02")).toBeTruthy();
    expect(screen.getByText("A supplied introduction for this route.")).toBeTruthy();
    expect(screen.getByRole("region", { name: "Route details" })).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Supplied child content" })).toBeTruthy();
  });

  it("renders global chrome with home-safe navigation targets", () => {
    renderInteriorPage();

    expect(screen.getByRole("link", { name: "Sai World Travels home" }).getAttribute("href")).toBe(
      "/",
    );
    expect(screen.getByRole("link", { name: "How we work" }).getAttribute("href")).toBe(
      "/how-we-work",
    );
    expect(
      screen.getByRole("link", { name: "How we work" }).getAttribute("aria-current"),
    ).toBe("page");
    expect(
      screen.getByRole("link", { name: "Travel inspiration" }).getAttribute("href"),
    ).toBe("/travel-inspiration");
    expect(screen.getByRole("link", { name: "About" }).getAttribute("href")).toBe(
      "/about",
    );
    expect(
      screen.getByRole("link", { name: "About" }).getAttribute("aria-current"),
    ).toBeNull();
    expect(screen.getByRole("link", { name: "Plan your journey" }).getAttribute("href")).toBe(
      "/#contact",
    );
  });

  it("offers a keyboard skip link to the main landmark", () => {
    renderInteriorPage();

    expect(
      screen.getByRole("link", { name: "Skip to main content" }).getAttribute("href"),
    ).toBe("#interior-main");
    expect(screen.getByRole("main").getAttribute("id")).toBe("interior-main");
  });

  it("keeps the supplied logo and footer home link accessible", () => {
    renderInteriorPage();

    expect(screen.getByAltText("Sai World Travels").getAttribute("src")).toBe(
      "/brand/sai-world-logo.jpeg",
    );
    expect(
      screen.getByRole("link", { name: /sai world travels holidays, your way\./i }).getAttribute("href"),
    ).toBe("/");
  });
});
