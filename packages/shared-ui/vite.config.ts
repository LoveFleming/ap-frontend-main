import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";

// ESM 寫法取得 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    resolve: {
        alias: {
            "@shared-ui": path.resolve(__dirname, "src"),
        },
    },
});
