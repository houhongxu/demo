/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 自定义的环境变量通过interface添加声明

  readonly VITE_APP_TITLE: string
  readonly VITE_IMG_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module 'virtual:*' {
  export default any
}
