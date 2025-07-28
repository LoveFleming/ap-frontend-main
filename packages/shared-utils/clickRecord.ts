/**
 * 點擊紀錄工具（支援多產品 endpoint）
 *
 * 使用方式：
 * 1. 先呼叫 initClickRecord 設定 endpoint
 * 2. 使用 recordClick 紀錄點擊事件
 *
 * 可於 recordClick 時傳入 overrideEndpoint 覆寫 endpoint
 */

let clickRecordEndpoint: string | null = null;

/**
 * 設定全域點擊紀錄 API endpoint
 * @param endpoint API URL
 */
export function initClickRecord(endpoint: string) {
    clickRecordEndpoint = endpoint;
}

/**
 * 紀錄點擊事件
 * @param eventName 事件名稱
 * @param data 可選的額外資料
 * @param overrideEndpoint 覆寫 endpoint（可選）
 */
export async function recordClick(
    eventName: string,
    data?: Record<string, any>,
    overrideEndpoint?: string
) {
    const endpoint = overrideEndpoint || clickRecordEndpoint;
    const payload = { eventName, ...data };

    if (endpoint) {
        try {
            await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('[ClickRecord] 發送失敗', err);
        }
    } else {
        // eslint-disable-next-line no-console
        console.log('[ClickRecord] endpoint 未設定，僅 log:', payload);
    }
}