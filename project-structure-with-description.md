# 專案結構與簡要說明

## 頂層目錄

```
react-antd-admin-main/
├── .env                        # 環境變數設定檔
├── .gitconfig                  # Git 設定檔
├── .gitignore                  # Git 忽略檔案清單
├── eslint.config.js            # ESLint 設定檔
├── package.json                # 專案描述與依賴管理
├── package-lock.json           # 依賴鎖定檔案
├── pnpm-workspace.yaml         # pnpm 工作區設定
├── postcss.config.js           # PostCSS 設定檔
├── README.zh-CN.md             # 中文專案說明文件
├── docs/                       # 專案相關文件
├── fake/                       # 假資料或測試用工具
├── public/                     # 靜態資源（如 index.html、圖片等）
├── src/                        # 主要原始碼目錄
├── tests/                      # 測試相關檔案
```

## src/ 目錄

```
src/
├── app.tsx                     # React 應用程式進入點
├── index.tsx                   # React DOM 渲染進入點
├── setupTests.ts               # 測試初始化設定
├── api/                        # API 請求相關模組
├── assets/                     # 靜態資源（如圖片、SVG）
├── components/                 # 可重用 React 元件
├── constants/                  # 專案常數設定
├── hooks/                      # React 自訂 Hook
├── icons/                      # 圖示元件與 SVG
├── locales/                    # 多語系相關檔案
├── pages/                      # 各個頁面元件
├── router/                     # 路由設定與守衛
├── store/                      # 狀態管理（如 Redux、MobX）
├── styles/                     # 全域與主題樣式
├── types/                      # TypeScript 型別定義
├── utils/                      # 工具函式
```

## 其他主要目錄簡要說明

- `docs/`：存放專案相關說明文件或設計文檔。
- `fake/`：用於開發或測試的假資料、模擬 API 或工具。
- `public/`：專案靜態資源，通常包含 index.html、favicon、公開圖片等。
- `tests/`：單元測試、整合測試等測試檔案。

---

> 若需更細節（如 `src/components/`、`src/pages/` 內所有檔案/目錄說明），請告知！