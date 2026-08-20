import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Sai World Travels | Holidays, Your Way",
    template: "%s | Sai World Travels",
  },
  description:
    "Personalised, end-to-end holidays planned for travellers introduced through Sai World Travels' trusted client network.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
