/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 科技感深色基底
        tech: {
          900: '#0a0e27',
          800: '#1a1f3a',
          700: '#2d3561',
        },
        // 温暖活力点缀
        warmth: {
          primary: '#ff6b35',
          secondary: '#f7c531',
          accent: '#ff8c42',
        },
        // 商务蓝灰
        business: {
          900: '#1e293b',
          800: '#334155',
          700: '#475569',
        },
      },
      fontFamily: {
        // 独特的显示字体
        display: ['"Orbitron"', 'system-ui', 'sans-serif'],
        // 精致的正文字体
        body: ['"Inter"', '"Segoe UI"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
