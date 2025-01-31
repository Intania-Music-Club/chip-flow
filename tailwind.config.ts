import type { Config } from "tailwindcss";

export default {
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
        'primary-blue': '#09122C',
        'primary-red': '#872341'
      },
      fontFamily: {
        gotham: ['"Gotham"', 'sans-serif'],
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 120%, #872341 1%, #09122C 90%)',
      },
      borderWidth: {
        '1': '1px', // Adding border-b-1
      },
    },
  },
  plugins: [],
} satisfies Config;
