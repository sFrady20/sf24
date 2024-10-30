import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import { addDynamicIconSelectors } from "@iconify/tailwind";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      screens: {
        xs: "375px",
        "2xl": "1400px",
      },
      fontFamily: {
        body: "var(--font-body)",
        display: "var(--font-display)",
        title: "var(--font-title)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        ...Object.fromEntries(
          [
            "primary",
            "secondary",
            "tertiary",
            "muted",
            "accent",
            "popover",
            "card",
            "destructive",
          ].map((x) => [
            x,
            {
              DEFAULT: `hsl(var(--${x}))`,
              subtle: `hsl(var(--${x}-subtle))`,
              foreground: `hsl(var(--${x}-foreground))`,
            },
          ])
        ),
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        focus: {
          "0%": {
            opacity: "0",
            filter: "blur(8px)",
            transform: "translateY(4px)",
          },
          "100%": {
            opacity: "1",
            filter: "blur(0px)",
            transform: "translateY(0px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, addDynamicIconSelectors()],
};

export default config;
