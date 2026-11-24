/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        surface: {
          DEFAULT: '#08080a',
          card: '#0c0c10',
          elevated: '#121217',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-light': 'rgba(255, 255, 255, 0.12)',
        },
        primary: {
          DEFAULT: '#0066ff',
          glow: '#0052cc',
          cyan: '#38bdf8',
        },
        muted: {
          DEFAULT: '#71717a',
          light: '#a1a1aa',
          dark: '#3f3f46',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      maxWidth: {
        'app': '1200px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.8)',
        'blue-glow': '0 0 50px -10px rgba(0, 102, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
