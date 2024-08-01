# ssr-demo

测试 ssr 的项目

同时参考 [vite ssr](https://github.com/bluwy/create-vite-extra/tree/master/template-ssr-react-ts) 示例 与 [react-rouet examples](https://github.com/remix-run/react-router/tree/main/examples/ssr-data-router)

## 同构(水合)

服务端仅返回 html，对于事件与路由等 js 效果需要同构，让客户端也执行一遍 hydrate 的 js

## 路由

使用 react-router 例子

## 注水脱水

ssg 与 ssr 区别就在此，ssg 没有注水脱水

## 参考资料

- [掘金 1](https://juejin.cn/post/6844903943902855176)
- [掘金 2](https://juejin.cn/post/6844903881390964744)
