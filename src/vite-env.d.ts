/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_TITLE_MODE_SUFFIX?: string;
    readonly VITE_DOMAIN_NAME?: string;
    readonly VITE_SUBDOMAIN?: string;
    readonly VITE_ANALYTICS_GTAG_ID?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
