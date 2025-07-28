// 此檔案為唯一設計 Token 定義處，請勿於其他地方重複定義
// 其他專案請以 require/import 方式引用本檔案

/** @type {import('tailwindcss').Config} */
module.exports = {
  // 若需自訂 content 路徑，請於專案端設定
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#f59e42',
        success: '#22c55e',
        warning: '#facc15',
        error: '#ef4444',
        info: '#0ea5e9',
        // ...可依需求擴充
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '2rem',
        xl: '4rem',
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
      },
    },
  },
  plugins: [],
};

// 使用說明：
// 於專案 tailwind.config.js
// const sharedConfig = require('packages/shared-tailwind-config/tailwind.config');
// module.exports = {
//   ...sharedConfig,
//   // 可於此 extend content 或 plugins
// }