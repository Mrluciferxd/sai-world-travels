// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import PlanYourJourneyPage, { metadata } from "./page";

vi.mock("next/image", () => ({
  default: ({ alt, priority, ...props }: React.ComponentProps<"img"> & { priority?: boolean }) => {
    void priority;
    // eslint-disable-next-line @next/next/no-img-element
    return <img alt={alt} {...props} />;
  },
}));

afterEach(cleanup);

describe("Plan Your Journey route", () => {
  it("renders unique metadata, one primary heading, and the referral form", () => {
    render(<PlanYourJourneyPage />);

    expect(metadata.title).toBe("Plan Your Journey");
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /your journey begins with a conversation\./i,
      }),
    ).toBeTruthy();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("region", { name: "Referral enquiry" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Send referral enquiry" })).toBeTruthy();
  });

  it("warns against collecting sensitive travel or payment data", () => {
    render(<PlanYourJourneyPage />);

    expect(screen.getByText(/do not share identity documents or payment information/i)).toBeTruthy();
    expect(screen.getByText(/do not include passport, identity, payment/i)).toBeTruthy();
  });
});
