import type { ReactNode } from "react";

export type EyebrowProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  withRule?: boolean;
};

export function Eyebrow({
  children,
  tone = "light",
  withRule = false,
}: EyebrowProps) {
  const className = tone === "dark" ? "eyebrow eyebrow-dark" : "eyebrow";

  return (
    <p className={className}>
      {withRule ? <span aria-hidden="true" /> : null}
      {children}
    </p>
  );
}
