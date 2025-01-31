/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Your existing custom colors
        "custom-teal": "#1abc9c",
        "custom-gray": "#2c3e50",
        transparent: "transparent",
        "custom-dashboard-selected": "#0d9488",
        "custom-dashboard-link-hover": "#94a3b8",
        "custom-login-hover": "#0f172a",
        "custom-logout-hover": "#dc2626",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        96: "24rem",
        128: "32rem",
      },
      height: {
        "custom-h-dashboard": "calc(100dvh-3px)",
        "fit-content": "fit-content",
        "custom-lg-vh": "607px",
        "custom-h-index-content": "calc(100%-208px)",
        "custom-h-index-side": "calc(100dvh-58px)",
        "custom-h-inner-side": "calc(50%-16px)",
      },
      position: {
        "custom-dashboard-selected": "relative",
      },
      width: {
        60: "15rem",
        80: "20rem",
        96: "24rem",
      },
      fontSize: {
        "6xl": ["6rem", { lineHeight: "1" }],
      },
      letterSpacing: {
        tight: ".025em",
      },
      borderColor: {
        default: "#e5e7eb",
      },
      boxShadow: {
        "custom-bubble":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        fillText: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fillText: "fillText 3s forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
