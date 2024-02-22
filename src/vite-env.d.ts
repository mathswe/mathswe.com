/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TITLE_MODE_SUFFIX: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
