import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'fire-red': '#dc2626',
        'fire-orange': '#ea580c',
        'fire-yellow': '#eab308',
        'prediction-low': '#22c55e',
        'prediction-medium': '#eab308',
        'prediction-high': '#dc2626',
      },
    },
  },
  plugins: [],
}
export default config