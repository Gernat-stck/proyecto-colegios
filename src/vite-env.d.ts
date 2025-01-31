/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_GOOGLE_URL: string;
  readonly VITE_API_GOOGLE_KEY: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
