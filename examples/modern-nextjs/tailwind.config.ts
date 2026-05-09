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
        brand: {
          primary: '#1e40af',
          secondary: '#7c3aed',
        },
        status: {
          pending: '#f59e0b',
          completed: '#10b981',
          failed: '#ef4444',
          cancelled: '#6b7280',
        },
      },
    },
  },
  plugins: [],
}

export default config
