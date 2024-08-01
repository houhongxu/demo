# vite

---

项目每个模块应该分离分支：

- plugin:实现 vite 插件分支

---

vite 特点：

- 在 Vite 项目中，一个 import 语句即代表一个 HTTP 请求

- Vite 所倡导的 no-bundle 理念的真正含义: 利用浏览器原生 ES 模块的支持，实现开发阶段的 Dev Server，进行模块的按需加载，而不是先整体打包再进行加载

## css

### 原生缺点

- 开发体验欠佳。比如原生 CSS 不支持选择器的嵌套
- 样式污染问题。如果出现同样的类名，很容易造成不同的样式互相覆盖和污染
- 浏览器兼容问题。为了兼容不同的浏览器，我们需要对一些属性(如 transition)加上不同的浏览器前缀，比如 -webkit-、-moz-、-ms-、-o-，意味着开发者要针对同一个样式属性写很多的冗余代码
- 打包后的代码体积问题。如果不用任何的 CSS 工程化方案，所有的 CSS 代码都将打包到产物中，即使有部分样式并没有在代码中使用，导致产物体积过大

### 解决方案

- CSS 预处理器：主流的包括 Sass/Scss、Less 和 Stylus
- CSS Modules：能将 CSS 类名处理成哈希值，这样就可以避免同名的情况下样式污染的问题
- CSS 后处理器 PostCSS，用来解析和处理 CSS 代码，可以实现的功能非常丰富，比如将 px 转换为 rem、根据目标浏览器情况自动加上类似于--moz--、-o-的属性前缀等等
- CSS in JS 方案，主流的包括 emotion、styled-components 等等，顾名思义，这类方案可以实现直接在 JS 中写样式代码，基本包含 CSS 预处理器和 CSS Modules 的各项优点，非常灵活，解决了开发体验和全局样式污染的问题
- CSS 原子化框架，如 Tailwind CSS、Windi CSS，通过类名来指定样式，大大简化了样式写法，提高了样式开发的效率，主要解决了原生 CSS 开发体验的问题

## 静态资源

### 图片加载

- 在 HTML 或者 JSX 中，通过 img 标签来加载图片
- 在 CSS 中通过 background 属性加载图片
- 在 JavaScript 中，通过脚本的方式动态指定图片的 src 属

#### svg

我们通常也希望能将 svg 当做一个组件来引入，这样我们可以很方便地修改 svg 的各种属性，而且比 img 标签的引入方式更加优雅

React 项目使用 vite-plugin-svgr 插件。

### JSON

Vite 中已经内置了对于 JSON 文件的解析，底层使用@rollup/pluginutils 的 dataToEsm 方法将 JSON 对象转换为一个包含各种具名导出的 ES 模块

### Web Worker 脚本

引入的时候注意加上?worker 后缀，相当于告诉 Vite 这是一个 Web Worker 脚本文件

### 生产环境

#### 自定义部署域名

自动化的方式来实现地址的替换

#### 单文件 or 内联

在 Vite 中，所有的静态资源都有两种构建方式，一种是打包成一个单文件，另一种是通过 base64 编码的格式内嵌到代码中

对于比较小的资源，适合内联到代码中，一方面对代码体积的影响很小，另一方面可以减少不必要的网络请求，优化网络性能。而对于比较大的资源，就推荐单独打包成一个文件，而不是内联了，否则可能导致上 MB 的 base64 字符串内嵌到代码中，导致代码体积瞬间庞大，页面加载性能直线下降

Vite 中内置的优化方案是下面这样的:

如果静态资源体积 >= 4KB，则提取成单独的文件
如果静态资源体积 < 4KB，则作为 base64 格式的字符串内联

#### 图片压缩

vite-plugin-imagemin

#### 雪碧图优化

在实际的项目中我们还会经常用到各种各样的 svg 图标，虽然 svg 文件一般体积不大，但 **Vite 中对于 svg 文件会始终打包成单文件**，大量的图标引入之后会导致网络请求增加，大量的 HTTP 请求会导致网络解析耗时变长，页面加载性能直接受到影响。

> HTTP2 的**多路复用设计**可以解决大量 HTTP 的请求导致的网络加载性能问题，因此雪碧图技术在 HTTP2 并没有明显的优化效果，这个技术更适合在传统的 HTTP 1.1 场景下使用(比如本地的 Dev Server)

Vite 中提供了 import.meta.glob 的语法糖来解决批量导入的问题
`const icons = import.meta.glob('../../assets/icons/logo-\*.svg');`

## 预构建

以下是开发阶段预构建处理，在生产构建中则会使用 @rollup/plugin-commonjs。

所谓的 no-bundle 只是对于源代码而言，对于第三方依赖而言，Vite 还是选择 bundle(打包)，并且使用速度极快的打包器 Esbuild 来完成这一过程，达到秒级的依赖编译速度。

相当多的第三方库仍然没有 ES 版本的产物，比如大名鼎鼎的 react，这种 CommonJS 格式的代码在 Vite 当中无法直接运行，我们需要将它转换成 ESM 格式的产物。
依赖预构建主要做了两件事情：

- 将其他格式(如 UMD 和 CommonJS)的产物转换为 ESM 格式，使其在浏览器通过 `<script type="module"><script>`的方式正常加载。

- 打包第三方库的代码，将各个第三方库分散的文件合并到一起，减少 HTTP 请求数量，避免页面加载性能劣化。

### 请求瀑布流问题

loadsh-es 库本身是有 ES 版本产物的，可以在 Vite 中直接运行。但实际上，它在加载时会发出特别多的请求，导致页面加载的前几秒几都乎处于卡顿状态

每个 import 都会触发一次新的文件请求，因此在这种依赖层级深、涉及模块数量多的情况下，会触发成百上千个网络请求，巨大的请求量加上 Chrome 对同一个域名下只能同时支持 6 个 HTTP 并发请求的限制，导致页面加载十分缓慢

在进行依赖的预构建之后，lodash-es 这个库的代码被打包成了一个文件，这样请求的数量会骤然减少，页面加载也快了许多

### 开启

#### 自动开启

项目启动成功后，你可以在根目录下的 node_modules 中发现.vite 目录，这就是预构建产物文件存放的目录

在浏览器访问页面后，打开 Dev Tools 中的网络调试面板，你可以发现第三方包的引入路径已经被重写

并且对于依赖的请求结果，Vite 的 Dev Server 会设置强缓存

如果以下 3 个地方都没有改动，Vite 将一直使用本地.vite 缓存文件:

- package.json 的 dependencies 字段
- 各种包管理器的 lock 文件
- optimizeDeps 配置内容

#### 手动开启

任意一种方法清除缓存:

- 删除 node_modules/.vite 目录。
- 在 Vite 配置文件中，将 server.force 设为 true。(注意，Vite 3.0 中配置项有所更新，你需要将 optimizeDeps.force 设为 true)
- 命令行执行 npx vite --force 或者 npx vite optimize。

### 自定义配置详解

- 入口文件——entries：支持 glob 语法

- 添加一些依赖——include：动态 import 经常会导致某些依赖只能在运行时被识别出来，vite 会二次预构建，仅需要把预构建的流程重新运行一遍，还得重新刷新页面，并且需要重新请求所有的模块，所以需要通过 include 参数提前声明需要按需加载的依赖

### 第三方库有问题

#### 改第三方库代码

pnpm7.4.0 版本后，其内置了 patch 包的功能

也可以使用 patch-package 这个库

一方面，它能记录第三方库代码的改动，另一方面也能将改动同步到团队每个成员。

package.json 配置通过 postinstall 脚本自动应用 patches 的修改

#### 加入 Esbuild 插件

修改指定模块的内容

## 双引擎架构

### 性能利器——Esbuild

Esbuild 的确是 Vite 高性能的得力助手，在很多关键的构建阶段让 Vite 获得了相当优异的性能

#### 依赖预构建——作为 Bundle 工具

依赖预构建阶段， Esbuild 作为 Bundler 的角色存在

Esbuild 作为打包工具也有一些缺点。

- 不支持降级到 ES5 的代码。这意味着在低端浏览器代码会跑不起来。
- 不支持 const enum 等语法。这意味着单独使用这些语法在 esbuild 中会直接抛错。
- 不提供操作打包产物的接口，像 Rollup 中灵活处理打包产物的能力(如 renderChunk 钩子)在 Esbuild 当中完全没有。
- 不支持自定义 Code Splitting 策略。传统的 Webpack 和 Rollup 都提供了自定义拆包策略的 API，而 Esbuild 并未提供，从而降级了拆包优化的灵活性。

#### 单文件编译——作为 TS 和 JSX 编译工具

在 TS(X)/JS(X) 单文件编译上面，Vite 也使用 Esbuild 进行语法转译，也就是将 Esbuild 作为 Transformer 来用

Esbuild 转译 TS 或者 JSX 的能力通过 Vite 插件提供，这个 Vite 插件在开发环境和生产环境都会执行，Vite 已经将 Esbuild 的 Transformer 能力用到了生产环境。

这部分能力用来替换原先 Babel 或者 TSC 的功能，因为无论是 Babel 还是 TSC 都有性能问题，大家对这两个工具普遍的认知都是: 慢，太慢了。

最大的局限性就在于 TS 中的类型检查问题。这是因为 Esbuild 并没有实现 TS 的类型系统，
vite build 之前会先执行 tsc 命令，也就是借助 TS 官方的编译器进行类型检查

#### 代码压缩——作为压缩工具

使用 Esbuild 来进行生产环境的代码压缩，包括 JS 代码和 CSS 代码。

在生产环境中 Esbuild 压缩器通过插件的形式融入到了 Rollup 的打包流程中

传统的方式都是使用 Terser 这种 JS 开发的压缩器来实现，在 Webpack 或者 Rollup 中作为一个 Plugin 来完成代码打包后的压缩混淆的工作。但 Terser 其实很慢

### 构建基石——Rollup

Rollup 在 Vite 中的重要性一点也不亚于 Esbuild，它既是 Vite 用作生产环境打包的核心工具，也直接决定了 Vite 插件机制的设计。

#### 生产环境 Bundle

Vite 默认选择在生产环境中利用 Rollup 打包，并基于 Rollup 本身成熟的打包能力进行扩展和优化，主要包含 3 个方面:

- CSS 代码分割。如果某个异步模块中引入了一些 CSS 代码，Vite 就会自动将这些 CSS 抽取出来生成单独的文件，提高线上产物的缓存复用率。对应 webpack 的 mini-css-extract-plugin

- 自动预加载。Vite 会自动为入口 chunk 的依赖自动生成预加载标签`<link rel="modulepreload">`这种适当预加载的做法会让浏览器提前下载好资源，优化页面性能。

- 异步 Chunk 加载优化。

#### 兼容插件机制

无论是开发阶段还是生产环境，Vite 都根植于 Rollup 的插件机制和生态

Vite 的插件写法完全兼容 Rollup，因此在生产环境中将所有的 Vite 插件传入 Rollup 也没有问题，反过来说，Rollup 插件却不一定能完全兼容 Vite
