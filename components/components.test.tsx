// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ArrowIcon } from "./arrow-icon";
import { Eyebrow } from "./eyebrow";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

vi.mock("next/image", () => ({
  default: ({ alt, priority, ...props }: React.ComponentProps<"img"> & { priority?: boolean }) => {
    void priority;

    return (
      // Component tests cover accessible rendering; the production smoke test covers optimization.
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt} {...props} />
    );
  },
}));

afterEach(cleanup);

describe("ArrowIcon", () => {
  it("is decorative and forwards safe SVG presentation props", () => {
    const { container } = render(<ArrowIcon className="test-arrow" />);
    const icon = container.querySelector("svg");

    expect(icon?.getAttribute("aria-hidden")).toBe("true");
    expect(icon?.getAttribute("class")).toBe("test-arrow");
    expect(screen.queryByRole("img")).toBeNull();
  });
});

describe("Eyebrow", () => {
  it("renders its label with the existing dark visual contract", () => {
    const { container } = render(
      <Eyebrow tone="dark" withRule>
        Travel inspiration
      </Eyebrow>,
    );

    expect(screen.getByText("Travel inspiration").className).toBe(
      "eyebrow eyebrow-dark",
    );
    expect(container.querySelector("span")?.getAttribute("aria-hidden")).toBe(
      "true",
    );
  });
});

describe("SiteHeader", () => {
  it("renders labelled navigation, local links, and the supplied logo", () => {
    render(
      <SiteHeader
        ctaHref="#contact"
        ctaLabel="Plan your journey"
        logoAlt="Sai World Travels"
        logoSrc="/brand/sai-world-logo.jpeg"
        navigation={[
          { href: "#approach", label: "How we work" },
          { href: "/about", label: "About" },
        ]}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeTruthy();
    expect(screen.getByRole("link", { name: "How we work" }).getAttribute("href")).toBe(
      "#approach",
    );
    expect(screen.getByRole("link", { name: "About" }).getAttribute("href")).toBe(
      "/about",
    );
    expect(
      screen.getByRole("link", { name: "Plan your journey" }).getAttribute("href"),
    ).toBe("#contact");
    expect(screen.getByAltText("Sai World Travels").getAttribute("src")).toBe(
      "/brand/sai-world-logo.jpeg",
    );
  });
});

describe("SiteFooter", () => {
  it("renders supplied copy without giving the decorative logo another name", () => {
    const { container } = render(
      <SiteFooter
        brandName="Sai World Travels"
        copyright="Copyright text"
        description="Supplied description"
        logoSrc="/brand/sai-world-logo.jpeg"
        tagline="Supplied tagline"
      />,
    );

    expect(screen.getByRole("link", { name: /sai world travels supplied tagline/i })).toBeTruthy();
    expect(screen.getByText("Supplied description")).toBeTruthy();
    expect(screen.getByText("Copyright text")).toBeTruthy();
    expect(screen.queryByRole("img")).toBeNull();
    expect(container.querySelector("img")?.getAttribute("src")).toBe(
      "/brand/sai-world-logo.jpeg",
    );
  });
});
