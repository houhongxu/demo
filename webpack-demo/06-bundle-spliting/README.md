# bundle spliting

- code-spliting：通过 import() API，比如对每个路由进行单独分包
- bundle-spliting：通过 splitChunks 属性(就是使用 SplitChunksPlugin)，对公共模块进行分包

## 重复打包

当 commonjs 被依赖两次时也被打包了两次分别在 foojs 于 barjs 里

- foo.js -> async chunk common.js
- bar.js -> async chunk common.js

## splitChunks

通过

```ts
splitChunks: {
      name: 'vendor',
      chunks: 'all',
      minChunks: 2, // 2个共享就进行拆包
      minSize: 0,
    }
```

可对 commonjs 进行分包

分包需要满足的三个条件:

1. minChunks: 一个模块是否最少被 minChunks 个 chunk 所引用
2. maxInitialRequests/maxAsyncRequests: 最多只能有 maxInitialRequests/maxAsyncRequests 个 chunk 需要同时加载 (如一个 Chunk 依赖 VendorChunk 才可正常工作，此时同时加载 chunk 数为 2)
3. minSize/maxSize: chunk 的体积必须介于 (minSize, maxSize) 之间

## splitChunks.cacheGroups

对不同特点的资源做分组处理，并为这些分组设置更有针对性的分包规则

## webpack 默认打包策略

- node_modules 资源会命中 defaultVendors 规则，并被单独打包；
- 只有包体超过 20kb 的 Chunk 才会被单独打包；
- 加载 Async Chunk 所需请求数不得超过 30；
- 加载 Initial Chunk 所需请求数不得超过 30。

```ts
A(splitChunks, 'defaultSizeTypes', () =>
  css ? ['javascript', 'css', 'unknown'] : ['javascript', 'unknown']
)
D(splitChunks, 'hidePathInfo', production)
D(splitChunks, 'chunks', 'async')
D(splitChunks, 'usedExports', optimization.usedExports === true)

// 默认配置为 minChunks: 1
D(splitChunks, 'minChunks', 1)

// 当前示例不在生产环境，因此 minSize: 10000
F(splitChunks, 'minSize', () => (production ? 20000 : 10000))
F(splitChunks, 'minRemainingSize', () => (development ? 0 : undefined))
F(splitChunks, 'enforceSizeThreshold', () => (production ? 50000 : 30000))
F(splitChunks, 'maxAsyncRequests', () => (production ? 30 : Infinity))
F(splitChunks, 'maxInitialRequests', () => (production ? 30 : Infinity))
D(splitChunks, 'automaticNameDelimiter', '-')
const { cacheGroups } = splitChunks

// 如果被至少二个 `async chunk` 所引用，体积大于 `10000`，则考虑进行分包
F(cacheGroups, 'default', () => ({
  idHint: '',
  reuseExistingChunk: true,
  minChunks: 2,
  priority: -20,
}))

// 从 priority:-10 可看出，该 cacheGroup 规则具有更高的优先级
// 如果被至少一个 `async chunk` 所引用，体积大于 `10000`，并且是 `node_modules` 中的第三方模块，则考虑进行分包
F(cacheGroups, 'defaultVendors', () => ({
  idHint: 'vendors',
  reuseExistingChunk: true,
  test: NODE_MODULES_REGEXP,
  priority: -10,
}))
```
