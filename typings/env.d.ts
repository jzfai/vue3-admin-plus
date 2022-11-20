declare global {
  interface ImportMetaEnv {
    readonly VITE_APP_BASE_URL: string
    readonly VITE_APP_IMAGE_URL: string
    readonly VITE_APP_ENV: string
    // 更多环境变量...
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
export {}
