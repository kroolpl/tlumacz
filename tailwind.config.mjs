/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',    // Brighter indigo
        secondary: '#7C3AED',  // Vibrant purple
        accent: '#F43F5E',     // Vivid rose
        
        // Additional accent colors for variety
        'accent-2': '#0EA5E9', // Sky blue
        'accent-3': '#10B981', // Emerald
        'accent-4': '#FB923C', // Orange
        'accent-5': '#EC4899', // Pink
        
        // Surface colors with slight tint
        'surface-50': '#F8FAFC',
        'surface-100': '#F1F5F9',
        'surface-200': '#E2E8F0',
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        heading: ['Fraunces', 'serif'],
        display: ['Fraunces', 'serif'],
      },
      fontSize: {
        'display-1': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-2': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-3': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title-1': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'title-2': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'body-large': ['1.125rem', { lineHeight: '1.5' }],
        'body-small': ['0.875rem', { lineHeight: '1.5' }],
      },
      letterSpacing: {
        'tighter': '-0.04em',
        'tight': '-0.02em',
        'wide': '0.02em',
        'wider': '0.04em',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(to right bottom, var(--tw-gradient-stops))',
        'gradient-candy': 'linear-gradient(45deg, var(--tw-gradient-stops))',
        'gradient-sunrise': 'linear-gradient(120deg, var(--tw-gradient-stops))',
        'gradient-ocean': 'linear-gradient(to left, var(--tw-gradient-stops))',
        'gradient-fire': 'linear-gradient(-45deg, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'glow': {
          '0%': { boxShadow: '0 0 0 rgba(79, 70, 229, 0.4)' },
          '100%': { boxShadow: '0 0 20px rgba(79, 70, 229, 0.6)' },
        },
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ]
}