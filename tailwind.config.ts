import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'flip-in': {
          '0%': {
            transform: 'rotateY(-90deg)',
            opacity: '0',
          },
          '100%': {
            transform: 'rotateY(0)',
            opacity: '1',
          },
        },
        'flip-out': {
          '0%': {
            transform: 'rotateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'rotateY(90deg)',
            opacity: '0',
          },
        },
      },
      animation: {
        'flip-in': 'flip-in 0.2s ease-out forwards',
        'flip-out': 'flip-out 0.2s ease-in forwards',
      },
      colors: {
        neutral: {
          '50': '#FAFAFA',
          '100': '#D4D4D4',
          '200': '#E5E7EB',
          '300': '#A3A3A3',
          '400': '#878787',
          '500': '#6E6E6E',
          '600': '#545454',
          '700': '#3B3B3B',
          '800': '#212121',
          '900': '#070707',
        },
        primary: {
          '50': '#F0F8FE',
          '100': '#CEE9FD',
          '200': '#9ED4FA',
          '300': '#6DBEF8',
          '400': '#3CA8F6',
          '500': '#0D92F4',
          '600': '#0975C3',
          '700': '#075892',
          '800': '#053B61',
          '900': '#021C2F',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          '50': '#F4F5F6',
          '100': '#E5E7EB',
          '200': '#BCBFC7',
          '300': '#A1A5B0',
          '400': '#858B99',
          '500': '#6B7280',
          '600': '#4B5563',
          '700': '#3C4048',
          '800': '#25272C',
          '900': '#111827',
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        success: {
          '50': '#EBFEF5',
          '100': '#D1FAE5',
          '200': '#A7F3D0',
          '300': '#6EE7B7',
          '400': '#34D399',
          '500': '#10B981',
          '600': '#10B981',
          '700': '#047857',
          '800': '#065F46',
          '900': '#064E3B',
        },
        warning: {
          '50': '#FFF6E5',
          '100': '#FEF3C7',
          '200': '#FDE68A',
          '300': '#FCD34D',
          '400': '#FBBF24',
          '500': '#FFA800',
          '600': '#D97706',
          '700': '#B45309',
          '800': '#92400E',
          '900': '#78350F',
        },
        error: {
          '50': '#FEEBEB',
          '100': '#FEE2E2',
          '200': '#FECACA',
          '300': '#FCA5A5',
          '400': '#F87171',
          '500': '#EF4444',
          '600': '#DC2626',
          '700': '#B91C1C',
          '800': '#991B1B',
          '900': '#7F1D1D',
        },
        dark: {
          '50': '#5F626B',
          '100': '#555962',
          '200': '#4C4F59',
          '300': '#424651',
          '400': '#424651',
          '500': '#393D48',
          '600': '#2F343F',
          '700': '#262A36',
          '800': '#1C212E',
          '900': '#131825',
          '950': '#141414',
        },
        gray: {
          '600': '#666',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      fontFamily: {
        'plus-jakarta': ['var(--font-plus-jakarta-sans)'],
        roboto: ['var(--font-roboto)', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'serif'],
      },
      backgroundImage: {
        'gradient-primary':
          'linear-gradient(88.56deg, #0D92F4 49.64%, #77CDFF 99.8%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [typography, tailwindcssAnimate],
};

export default config;
