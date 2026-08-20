// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import TravelInspirationPage, { metadata } from "./page";

vi.mock("next/image", () => ({
  default: ({ alt, priority, ...props }: React.ComponentProps<"img"> & { priority?: boolean }) => {
    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
}));

afterEach(cleanup);

describe("Travel Inspiration route", () => {
  it("renders a non-interactive mood index with current navigation", () => {
    const { container } = render(<TravelInspirationPage />);

    expect(metadata.title).toBe("Travel Inspiration");
    expect(metadata.alternates?.canonical).toBe("/travel-inspiration");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /begin with the feeling. let the itinerary follow/i,
      }),
    ).toBeTruthy();
    expect(screen.getByRole("heading", { level: 2, name: "Ways a journey can feel" })).toBeTruthy();
    expect(container.querySelectorAll(".mood-entry")).toHaveLength(4);
    expect(container.querySelector(".mood-index a, .mood-index button")).toBeNull();
    expect(
      screen.getByRole("link", { name: "Travel inspiration" }).getAttribute("aria-current"),
    ).toBe("page");
  });
});
