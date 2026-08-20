import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sai World Travels",
    short_name: "Sai World Travels",
    description:
      "Personalised travel planning for travellers introduced through Sai World Travels' trusted client network.",
    start_url: "/",
    display: "browser",
    background_color: "#f7f4ed",
    theme_color: "#183c78",
    icons: [
      {
        src: "/brand/sai-world-logo.jpeg",
        sizes: "200x200",
        type: "image/jpeg",
      },
    ],
  };
}
