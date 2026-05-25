/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEON_DATA_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
