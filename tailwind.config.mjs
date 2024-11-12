/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        headline: ['Georgia', 'serif'],
        body: ['Times New Roman', 'serif'],
      }
    },
  },
  plugins: [],
}