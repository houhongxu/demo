# Component

## React 组件

### 类组件

```js
function Component(props, context, updater) {
  this.props = props //绑定props
  this.context = context //绑定context
  this.refs = emptyObject //绑定ref
  this.updater = updater || ReactNoopUpdateQueue //上面所属的updater 对象
}
/* 绑定setState 方法 */
Component.prototype.setState = function (partialState, callback) {
  this.updater.enqueueSetState(this, partialState, callback, 'setState')
}
/* 绑定forceupdate 方法 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate')
}
```

在 class 组件中，除了继承 React.Component ，底层还加入了 updater 对象

组件中调用的 setState 和 forceUpdate 本质上是调用了 updater 对象上的 enqueueSetState 和 enqueueForceUpdate 方法

#### super()问题

```jsx
/* 假设我们在 constructor 中这么写 */
constructor(){
    super() // 未传入props
    console.log(this.props) // 打印 undefined 为什么?
}
```

因为绑定 props 是在父类 Component 构造函数中，执行 super 等于执行 Component 函数，此时 props 没有作为第一个参数传给 super() ，在 Component 中就会找不到 props 参数，从而变成 undefined

有类字段后直接在类字段中使用 this.props 就可以

[见 dan 的博客](https://overreacted.io/zh-hans/why-do-we-write-super-props/)

#### 生命周期

### 函数组件

```js
function Index() {
  console.log(Index.number) // 打印 1
  const [message, setMessage] = useState('hello,world') /* hooks  */
  return (
    <div onClick={() => setMessage('let us learn React!')}> {message} </div>
  ) /* 返回值 作为渲染ui */
}
Index.number = 1 /* 绑定静态属性 */
```

### 类组件与函数组件区别

对于类组件来说，底层只需要实例化一次，实例中保存了组件的 state 等状态。对于每一次更新只需要调用 render 方法以及对应的生命周期就可以了。但是在函数组件中，每一次更新都是一次新的函数执行，一次函数组件的更新，里面的变量会重新声明。

为了能让函数组件可以保存一些状态，执行一些副作用钩子，React Hooks 应运而生，它可以帮助记录 React 中组件的状态，处理一些额外的副作用。

## 组件通信方式

- props 和 callback 方式
- ref 方式。
- React-redux 或 React-mobx 状态管理方式
- context 上下文方式
- event bus 事件总线

## 组件强化方式

- 类组件继承，注意生命周期和 state 不继承
- 函数组件自定义 Hooks
- HOC 高阶组件
