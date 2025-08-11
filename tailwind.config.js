/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: 'var(--brand-bg)',
          text: 'var(--brand-text)',
          accent: 'var(--brand-accent)',
          accent2: 'var(--brand-accent-2)',
          accent3: 'var(--brand-accent-3)',
          muted: 'var(--brand-muted)',
          border: 'var(--brand-border)'
        }
      }
    }, extend: {} },
  plugins: [],
};
