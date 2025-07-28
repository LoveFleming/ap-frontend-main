/**
 * Tailwind CSS 設計 Token 範例
 * 可於 tailwind.config.js 透過 require 或 import 引用
 */

const colors = {
  primary: '#2563eb',
  secondary: '#64748b',
  accent: '#f59e42',
  success: '#22c55e',
  warning: '#facc15',
  error: '#ef4444',
  info: '#0ea5e9',
  // ...可依需求擴充
};

const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '2rem',
  xl: '4rem',
};

const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],
  sm: ['0.875rem', { lineHeight: '1.25rem' }],
  base: ['1rem', { lineHeight: '1.5rem' }],
  lg: ['1.125rem', { lineHeight: '1.75rem' }],
  xl: ['1.25rem', { lineHeight: '1.75rem' }],
};

module.exports = {
  colors,
  spacing,
  fontSize,
};

/**
 * 範例引用方式（於 tailwind.config.js）：
 * 
 * // CommonJS
 * const tokens = require('packages/shared-tailwind-config/tokens');
 * 
 * // ESM
 * import tokens from 'packages/shared-tailwind-config/tokens';
 * 
 * module.exports = {
 *   theme: {
 *     colors: tokens.colors,
 *     spacing: tokens.spacing,
 *     fontSize: tokens.fontSize,
 *   },
 *   // ...其他設定
 * }
 */