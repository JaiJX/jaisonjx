/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEON_DATA_API_URL?: string
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string
  readonly VITE_BOOK_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
