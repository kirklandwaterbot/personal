/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "system-ui", "sans-serif"]
      },
      colors: {
        accent: {
          50: "#fdf2ff",
          100: "#f7d6ff",
          200: "#ecadff",
          300: "#e084ff",
          400: "#d45bff",
          500: "#c832ff",
          600: "#9f25cc",
          700: "#771b99",
          800: "#4f1266",
          900: "#270933"
        }
      },
      boxShadow: {
        "glow-sm": "0 10px 30px -12px rgba(181, 105, 255, 0.45)",
        "glow-md": "0 20px 60px -15px rgba(167, 90, 255, 0.55)"
      },
      backgroundImage: {
        "grid-pattern":
          "radial-gradient(circle at 1px 1px, rgba(148, 163, 184, 0.25) 1px, transparent 0)",
        "noise-texture":
          "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 200 200%22%3E%3Cfilter id=%22n%22 x=%22-20%25%22 y=%22-20%25%22 width=%22140%25%22 height=%22140%25%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%221%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22 opacity=%220.2%22/%3E%3C/svg%3E')"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        "spin-slow": "spin 10s linear infinite",
        shimmer: "shimmer 1.5s linear infinite",
        "pulse-soft": "pulse-soft 4s ease-in-out infinite",
        "slide-up": "slide-up 0.7s ease-out forwards",
        "fade-in": "fade-in 1s ease-out forwards",
        "tilt": "tilt 5s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" }
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 0.95, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.03)" }
        },
        "slide-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        tilt: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" }
        }
      }
    }
  },
  plugins: []
};
