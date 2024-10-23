/// <reference types="vite/client" />

type ImportMetaEnv = {
    readonly VITE_TITLE_MODE_SUFFIX?: string;
    readonly VITE_DOMAIN_NAME?: string;
    readonly VITE_SUBDOMAIN?: string;
    readonly VITE_COOKIE_CONSENT_HOSTNAME?: string;
    readonly VITE_ANALYTICS_GTAG_ID?: string;
}

type ImportMeta = {
    readonly env: ImportMetaEnv;
}
