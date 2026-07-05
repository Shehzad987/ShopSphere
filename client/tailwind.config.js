/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#050508',
        surface: '#111827',
        surfaceLight: '#1A2333',
        primary: '#00F5FF',
        primaryHover: '#008CFF',
        textMain: '#F8FAFC',
        textMuted: '#94A3B8',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(0, 245, 255, 0.35)',
        glowHover: '0 0 35px rgba(0, 245, 255, 0.55)',
        card: '0 8px 30px rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00F5FF 0%, #008CFF 100%)',
        'gradient-radial': 'radial-gradient(circle at top, rgba(0,245,255,0.12), transparent 60%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-16px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
};
