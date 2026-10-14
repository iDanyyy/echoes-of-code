/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#080c10',
          panel: '#0e1726',
          border: '#1f293d',
          green: '#00ff66',
          accent: '#00e5ff',
          danger: '#ff0055',
          warning: '#f59e0b'
        }
      },
      fontFamily: {
        mono: ['Courier New', 'Courier', 'monospace']
      }
    },
  },
  plugins: [],
};
