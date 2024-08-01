# jsx

## jsx 处理后

### babel 处理后

```jsx
React.createElement(type, [props], [...children])
```

例如：

```jsx
<div>
  <TextComponent />
  <div>hello,world</div>
  let us learn React!
</div>
```

```jsx
React.createElement(
  'div',
  null,
  React.createElement(TextComponent, null),
  React.createElement('div', null, 'hello,world'),
  'let us learn React!'
)
```

> 旧版本 jsx 文件必须引入 React 就是因为 React.createElement

### createElement 处理后

通过 console.log 打印 jsx 即可看到
react element 对象

类似于：

```jsx
 {
    $$typeof: REACT_ELEMENT_TYPE, // 指定当前数据结构为ReactElement
    type,
    key,
    ref,
    props, // props包含children属性
  }
```

### reconciler 调和处理后

fiber 树
通过 sibling、return、child 将每一个 fiber 对象联系起来

针对不同 react element 对象有不同 tag 的 fiber 对象

```jsx
export const FunctionComponent = 0 // 函数组件
export const ClassComponent = 1 // 类组件
export const IndeterminateComponent = 2 // 初始化的时候不知道是函数组件还是类组件
export const HostRoot = 3 // Root Fiber 可以理解为根元素 ， 通过reactDom.render()产生的根元素
export const HostPortal = 4 // 对应  ReactDOM.createPortal 产生的 Portal
export const HostComponent = 5 // dom 元素 比如 <div>
export const HostText = 6 // 文本节点
export const Fragment = 7 // 对应 <React.Fragment>
export const Mode = 8 // 对应 <React.StrictMode>
export const ContextConsumer = 9 // 对应 <Context.Consumer>
export const ContextProvider = 10 // 对应 <Context.Provider>
export const ForwardRef = 11 // 对应 React.ForwardRef
export const Profiler = 12 // 对应 <Profiler/ >
export const SuspenseComponent = 13 // 对应 <Suspense>
export const MemoComponent = 14 // 对应 React.memo 返回的组件
```

## React api 操作 react elemnt 对象

api：

- React.Children.toArray 扁平化，规范化 children 数组
- React.Children.forEach = React.Children.toArray + Array.prototype.forEach.call
- React.createElement 创建 react element 对象，也就是旧版本 jsx 调用的 api
- cloneElement 的作用是以 element 元素为样板克隆并返回新的 React element 元素。返回元素的 props 是将新的 props 与原始元素的 props 浅层合并后的结果。

## Babel 解析 JSX 流程

### 旧版本

#### @babel/plugin-syntax-jsx 和 @babel/plugin-transform-react-jsx

- @babel/plugin-syntax-jsx ： 使用这个插件，能够让 Babel 有效的解析 JSX 语法。
- @babel/plugin-transform-react-jsx ：这个插件内部调用了 @babel/plugin-syntax-jsx，可以把 React JSX 转化成 JS 能够识别的 createElement 格式。

#### 解析 api 模拟实现

```jsx
import React from 'react'

function TestComponent() {
  return <p> hello,React </p>
}
function Index() {
  return (
    <div>
      <span>模拟 babel 处理 jsx 流程。</span>
      <TestComponent />
    </div>
  )
}
export default Index
```

```jsx
const fs = require('fs')
const babel = require('@babel/core')

/* 第一步：模拟读取文件内容。 */
fs.readFile('./element.js', (e, data) => {
  const code = data.toString('utf-8')
  /* 第二步：转换 jsx 文件 */
  const result = babel.transformSync(code, {
    plugins: ['@babel/plugin-transform-react-jsx'],
  })
  /* 第三步：模拟重新写入内容。 */
  fs.writeFile('./element.js', result.code, function () {})
})
```

### 新版本

#### Automatic Runtime

不需要引入 createElement

编译过程：

```jsx
function Index() {
  return (
    <div>
      <h1>hello,world</h1>
      <span>let us learn React</span>
    </div>
  )
}
```

```jsx
import { jsx as _jsx } from 'react/jsx-runtime'
import { jsxs as _jsxs } from 'react/jsx-runtime'
function Index() {
  return _jsxs('div', {
    children: [
      _jsx('h1', {
        children: 'hello,world',
      }),
      _jsx('span', {
        children: 'let us learn React',
      }),
    ],
  })
}
```

与编译器合作实现了 定制 api

需要配置编译器

```json
"presets": [
    ["@babel/preset-react",{
    "runtime": "automatic"
    }]
],

```

#### Classic Runtime

经典模式下，使用 JSX 的文件需要引入 React
