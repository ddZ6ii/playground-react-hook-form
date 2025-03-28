import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import { defineConfig } from "vite"

// Define chrome as default browser for the dev server.
const opsys = process.platform
// windows
if (opsys === "win32") process.env.BROWSER = "chrome"
// macOS
if (opsys === "darwin") process.env.BROWSER = "/Applications/Google Chrome.app"

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    emptyOutDir: true,
    outDir: resolve(import.meta.dirname, "dist"),
    sourcemap: true,
    minify: true,
    cssMinify: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
    },
  },
  plugins: [react(), tailwindcss()],
})
