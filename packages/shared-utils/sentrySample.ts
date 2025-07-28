/**
 * Sentry 初始化與錯誤回報範例
 * 請先安裝 Sentry SDK: npm install @sentry/browser
 */
import * as Sentry from '@sentry/browser';

/**
 * 初始化 Sentry
 * @param dsn Sentry DSN
 */
export function initSentry(dsn: string) {
    Sentry.init({
        dsn,
        // 可根據需求加入更多設定
        tracesSampleRate: 1.0,
    });
}

/**
 * 回報錯誤到 Sentry
 * @param error 錯誤物件
 * @param context 可選的額外資訊
 */
export function reportError(error: any, context?: Record<string, any>) {
    Sentry.captureException(error, {
        extra: context,
    });
}

// 範例用法：
// import { initSentry, reportError } from './sentrySample';
// initSentry('你的 Sentry DSN');
// try {
//   throw new Error('測試錯誤');
// } catch (e) {
//   reportError(e, { foo: 'bar' });
// }