# 调试需要浏览器环境运行

## 开启

- 通过动态导入中的魔法注释开启
- 也可以通过标签 `<link rel="prefetch" href="style.css" as="style">` 开启

## 如何加载

1. preload 加载当前路由必需资源，优先级高
2. prefetch 优先级低，在浏览器 idle 状态时加载资源。一般用以加载其它路由资源，如当页面出现 Link，可 prefetch 当前 Link 的路由资源。（next.js 默认会对 link 做懒加载+prefetch，即当某条 Link 出现页面中，即自动 prefetch 该 Link 指向的路由资源

preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
浏览器支持程度不同。prefetch 更高

> preload chunk 会在父 chunk 加载时，以并行方式开始加载，因为 main 默认已经首屏加载，所以需要在 sumjs 里 preload 导入 add 才产生 preload（加载 chunk 的 chunk 才会 preload）
