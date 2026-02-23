/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7f0df2',
        'primary-hover': '#650bc2',
        'background-light': '#f7f5f8',
        'background-dark': '#191022',
        'sidebar-dark': '#141118',
        'card-dark': '#231b2e',
        'input-dark': '#211b27',
        'border-dark': '#473b54',
        'text-secondary': '#ab9cba',
        'accent-cyan': '#00f0ff',
        'accent-green': '#0bda73',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        neon: '0 0 15px rgba(127, 13, 242, 0.4)',
        'neon-green': '0 0 10px rgba(11, 218, 115, 0.5)',
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}