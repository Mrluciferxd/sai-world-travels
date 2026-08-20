// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ReferralEnquiryForm } from "./referral-enquiry-form";

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

async function completeRequiredFields() {
  const user = userEvent.setup();
  render(<ReferralEnquiryForm />);

  await user.type(screen.getByLabelText(/full name/i), "Aarav Mehta");
  await user.type(screen.getByLabelText(/phone number/i), "+91 98765 43210");
  await user.type(
    screen.getByLabelText(/who introduced you/i),
    "Introduced by a past Sai World traveller",
  );
  await user.type(
    screen.getByLabelText(/what kind of journey/i),
    "A relaxed family holiday with time to explore together.",
  );
  await user.click(screen.getByRole("checkbox", { name: /may use these details/i }));

  return user;
}

describe("ReferralEnquiryForm", () => {
  it("renders the minimal fields and a hidden honeypot", () => {
    const { container } = render(<ReferralEnquiryForm />);

    expect(screen.getByLabelText(/full name/i).hasAttribute("required")).toBe(true);
    expect(screen.getByLabelText(/phone number/i).hasAttribute("required")).toBe(true);
    expect(screen.getByLabelText(/who introduced you/i).hasAttribute("required")).toBe(true);
    expect(screen.getByLabelText(/what kind of journey/i).hasAttribute("required")).toBe(true);
    expect(screen.getByLabelText(/email address/i).hasAttribute("required")).toBe(false);
    expect(screen.getByLabelText(/preferred travel timing/i).hasAttribute("required")).toBe(false);

    const honeypot = container.querySelector<HTMLInputElement>('input[name="website"]');
    expect(honeypot?.getAttribute("tabindex")).toBe("-1");
    expect(honeypot?.closest(".enquiry-honeypot")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("shows and focuses accessible validation feedback before sending", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    render(<ReferralEnquiryForm />);
    await user.click(screen.getByRole("button", { name: "Send referral enquiry" }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toMatch(/check the highlighted details/i);
    expect(document.activeElement).toBe(alert);
    expect(screen.getByLabelText(/full name/i).getAttribute("aria-invalid")).toBe("true");
    expect(screen.getByLabelText(/phone number/i).getAttribute("aria-invalid")).toBe("true");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("posts the canonical JSON contract and renders success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: true }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = await completeRequiredFields();

    await user.click(screen.getByRole("button", { name: "Send referral enquiry" }));

    expect((await screen.findByRole("status")).textContent).toMatch(
      /your referral enquiry was received/i,
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [endpoint, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(endpoint).toBe("/api/enquiries");
    expect(options.method).toBe("POST");
    expect(options.headers).toEqual({ "Content-Type": "application/json" });
    expect(JSON.parse(String(options.body))).toEqual({
      fullName: "Aarav Mehta",
      phone: "+91 98765 43210",
      email: "",
      referralContext: "Introduced by a past Sai World traveller",
      travelIntent: "A relaxed family holiday with time to explore together.",
      preferredTiming: "",
      consent: true,
      website: "",
    });
  });

  it("disables submission while the request is pending", async () => {
    let resolveRequest: ((response: Response) => void) | undefined;
    const request = new Promise<Response>((resolve) => {
      resolveRequest = resolve;
    });
    vi.stubGlobal("fetch", vi.fn().mockReturnValue(request));
    const user = await completeRequiredFields();

    await user.click(screen.getByRole("button", { name: "Send referral enquiry" }));

    const submittingButton = screen.getByRole("button", { name: "Sending enquiry…" });
    expect(submittingButton.hasAttribute("disabled")).toBe(true);
    expect(screen.getByText("Sending your enquiry.")).toBeTruthy();

    resolveRequest?.(
      new Response(JSON.stringify({ ok: true }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );
    await screen.findByRole("status");
  });

  it("maps documented server field errors back to their controls", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            ok: false,
            code: "INVALID_REQUEST",
            fieldErrors: { phone: "Check this phone number." },
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        ),
      ),
    );
    const user = await completeRequiredFields();

    await user.click(screen.getByRole("button", { name: "Send referral enquiry" }));

    expect(await screen.findByText("Check this phone number.")).toBeTruthy();
    expect(screen.getByLabelText(/phone number/i).getAttribute("aria-invalid")).toBe("true");
  });

  it("renders one safe unavailable state for rejected or failed requests", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ ok: false, code: "ENQUIRY_UNAVAILABLE" }), {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const user = await completeRequiredFields();

    await user.click(screen.getByRole("button", { name: "Send referral enquiry" }));

    const alert = await screen.findByRole("alert");
    expect(alert.textContent).toMatch(/your enquiry could not be sent/i);
    expect(alert.textContent).not.toMatch(/database|supabase|service role/i);
    await waitFor(() => expect(document.activeElement).toBe(alert));
  });

  it("does not send honeypot content as a valid-looking human submission", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ ok: false, code: "INVALID_REQUEST" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }),
    );
    vi.stubGlobal("fetch", fetchMock);
    const user = await completeRequiredFields();
    const honeypot = document.querySelector<HTMLInputElement>('input[name="website"]');
    fireEvent.change(honeypot as HTMLInputElement, { target: { value: "bot.example" } });

    await user.click(screen.getByRole("button", { name: "Send referral enquiry" }));

    await waitFor(() => expect(fetchMock).toHaveBeenCalled());
    const payload = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body));
    expect(payload.website).toBe("bot.example");
  });
});
