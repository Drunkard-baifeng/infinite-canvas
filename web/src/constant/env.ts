export const APP_VERSION = __APP_VERSION__ || "dev";
export const JISUAI_URL = "https://api.jisuai.net";
export const CONTACT_QQ = "1591446524";

export const DOCS_URL = import.meta.env.VITE_DOC_URL || "https://github.com/Drunkard-baifeng/infinite-canvas/tree/main/docs/content/docs";

// Official plugin registry URL: CI publishes to plugins-dist for jsDelivr delivery; an environment variable may override it for self-hosting.
export const PLUGIN_REGISTRY_URL = import.meta.env.VITE_PLUGIN_REGISTRY_URL || "https://cdn.jsdelivr.net/gh/basketikun/infinite-canvas@plugins-dist/official-plugins.json";
