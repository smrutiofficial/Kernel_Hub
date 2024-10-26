import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#ffffff", // Set default text color to white
            h1: {
              color: "#AAFFA9",
              fontWeight: "700",
            },
            blockquote: {
              borderLeftColor: "#AAFFA9",
              fontStyle: "italic",
              color: "#ccc",
            },
            strong: {
              color: "#ffffff", // White color for strong/bold text
            },
            a: {
              color: "#AAFFA9", // Optional: set link color
              textDecoration: "underline",
            },
            table: {
              color: "#ffffff", // Set table text color to white
              borderColor: "#ffffff", // Set table border color to white
            },
            th: {
              color: "#ffffff", // Set header text color to white
            },
            td: {
              color: "#ffffff", // Set body text color to white
            },
            thead: {
              color: "#ffffff", // Set thead text color to white
            },
            tbody: {
              color: "#ffffff", // Set tbody text color to white
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};

export default config;
