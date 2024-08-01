# state

React 多种模式：

legacy->blocking->concurrent

## 类组件中的 state

- 首先，setState 会产生当前更新的优先级（老版本用 expirationTime ，新版本用 lane ）
- 接下来 React 会从 fiber Root 根部 fiber 向下调和子节点，调和阶段将对比发生更新的地方，更新对比 expirationTime ，找到发生更新的组件，合并 state，然后触发 render 函数，得到新的 UI 视图层，完成 render 阶段
- 接下来到 commit 阶段，commit 阶段，替换真实 DOM ，完成此次更新流程
- 此时仍然在 commit 阶段，会执行 setState 中 callback 函数,如上的()=>{ console.log(this.state.number) }，到此为止完成了一次 setState 全过程

### 类组件如何限制 state 更新视图

- pureComponent 可以对 state 和 props 进行浅比较，如果没有发生变化，那么组件不更新
- shouldComponentUpdate 生命周期可以通过判断前后 state 变化来决定组件需不需要更新，需要更新返回 true，否则返回 false

### 原理

调用 setState 方法，实际上是 React 底层调用 Updater 对象上的 enqueueSetState 方法

```ts
enqueueSetState(){
     /* 每一次调用`setState`，react 都会创建一个 update 里面保存了 */
     const update = createUpdate(expirationTime, suspenseConfig);
     /* callback 可以理解为 setState 回调函数，第二个参数 */
     callback && (update.callback = callback)
     /* enqueueUpdate 把当前的update 传入当前fiber，待更新队列中 */
     enqueueUpdate(fiber, update);
     /* 开始调度更新 */
     scheduleUpdateOnFiber(fiber, expirationTime);
}
```

React 是采用事件合成的形式，每一个事件都是由 React 事件系统统一调度的，那么 State 批量更新正是和事件系统息息相关的

### unstable_batchedUpdates

异步操作里面的批量更新规则会被打破

通过 unstable_batchedUpdates 手动批量更新

## flushSync

flushSync 可以将回调函数中的更新任务，放在一个较高的优先级中
调用了 flushSync ，就会先执行更新

flushSync 中的 setState > 正常执行上下文中 setState > setTimeout ，Promise 中的 setState。

## 函数组件中的 state

在 useState 的 dispatchAction 处理逻辑中，会浅比较两次 state ，发现 state 相同，不会开启更新调度任务
