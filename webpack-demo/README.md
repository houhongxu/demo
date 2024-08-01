# 学习 webpack

node xxx.js 因为执行时终端所在路径不一定为项目目录，所以建议 entry 使用绝对路径

运行时源码注释写在 example 中

## 打包

每个文件夹有单独的 build.js 通过 node 调用 webpack

子文件夹进行多配置导出，在 webpack.config.js 可以统一打包，暂时调用子文件夹 build 进行统一打包，未进行统一配置

总体的多入口打包尚未做分别配置，暂时不用，仅做示例

因为需要热重载，所以还是需要进行统一配置

统一配置时注释掉每个 build.js 中的执行文件

热重载会自动打开从上到下（因为读取目录时的顺序）的**第一个**有 html 配置的服务，如果没有是 Cannot get 页面

## TODO

- [x] 将测试的手写简易 webpack 分离
- [x] 热重载

## 注意

vercel 的 serve 是以 根 目录来算，在 code-spliting 目录不能直接 npx serve dist 应该 npx serve ./code-spliting/dist
