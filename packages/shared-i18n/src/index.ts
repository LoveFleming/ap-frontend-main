type LocaleMessages = Record<string, string>;

class I18n {
    private locales: Record<string, LocaleMessages> = {};
    private currentLocale: string = "en-US";

    setLocale(locale: string) {
        if (this.locales[locale]) {
            this.currentLocale = locale;
        } else {
            throw new Error(`Locale "${locale}" not found.`);
        }
    }

    addLocale(locale: string, messages: LocaleMessages) {
        this.locales[locale] = messages;
    }

    t(key: string, options?: { locale?: string }): string {
        const locale = options?.locale || this.currentLocale;
        const messages = this.locales[locale];
        if (!messages) return key;
        return messages[key] ?? key;
    }
}

// 預設匯出單例
const i18n = new I18n();

// 載入預設語系
import enUS from "./locales/en-US";
import zhTW from "./locales/zh-TW";
i18n.addLocale("en-US", enUS);
i18n.addLocale("zh-TW", zhTW);

export default i18n;
export type { LocaleMessages };