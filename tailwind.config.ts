import type { Config } from "tailwindcss"
import colors from "tailwindcss/colors"

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-quicksand)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          blue: colors.blue[600],
          red: colors.red[600],
        },
      },
      maxWidth: {
        content: "72rem",
        prose: "48rem",
      },
      spacing: {
        "section-y": "4rem",
        "section-y-lg": "5rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
}
export default config
