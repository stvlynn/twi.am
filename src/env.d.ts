/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DIFY_API_URL: string
  readonly VITE_DIFY_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
