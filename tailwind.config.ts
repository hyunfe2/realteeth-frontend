import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "#10A6C1",
          50: "#E6F7FA",
          100: "#CCF0F5",
          200: "#99E1EB",
          300: "#66D1E0",
          400: "#33C2D6",
          500: "#10A6C1",
          600: "#0D859A",
          700: "#0A6373",
          800: "#07424D",
          900: "#042126",
        },
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
