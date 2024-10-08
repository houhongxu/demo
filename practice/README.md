# 练习

## 2022.03.21 问题

1. 使用 `prettier`。同步一份 ✅
2. React 不需要显示导入 ✅
3. 全局声明，统一使用 typing.d.ts ✅
4. 每个一练习，请单独一个路由 ✅
5. 所有非页面组件，务必都放在 `./src/components` 路径下 ✅
6. 非页面组件文件，命名请使用大峰驼，如 `TodoList` ✅
7. 定义务必大峰驼写法，如 `CustomeTypes` ✅
8. 没有必要把组件拆分的很细，特别是仅仅几十行代码的组件，以 `List` 为例。单文件代码一半超过 200-250 行再考虑分离 ✅
9. 没有用到的定义请务必清理 ✅

### 注意

1. 组件命名需要和实际代码内容保持一致 ✅
2. 没有做完的代码请不要提交 ✅
3. 每完成一项练习就提交一次。并不是说完成 N 项练习就提交一次
4. git commit 格式：`upd: 😊 做点事` ✅

## 2022.03.22 问题

1. 规范：未用到的依赖也请删除，不要保留 ✅
2. 规范：组件最终统一在 `index.ts` 中导出 ✅
3. 规范：useEffect 和 useLayoutEffect 建议放在函数最后 ✅
4. 问题：react 中，请使用命令式的方式更新视图。千万不要直接使用 document api 操作视图，这可能会导致 virtual dom 和 dom 不一致的情况 ✅
5. 问题：不要用 mock 了，自己随便生成点数据，模拟一下网络延迟就行了 ✅
6. 问题：练习一 flex 的实现方式 ✅
7. 问题：练习二 会闪屏 ✅
8. 问题：练习三 加载中、点击加载更多、没有更多的状态去哪了？？ ✅
9. 问题：练习三和练习四 promise => async await ✅

## 2022.03.24 问题

1. 规范：注意换行 ✅
2. 规范：方法组件显示声明 FunctionComponent ✅
3. 规范：不参与 render 的常量可以放在方法组件之外（例如，modalDOM、getBase64）✅
4. 建议：多用 es6 语法（例如 List、getBase64、all === true）✅
5. 建议：state 要足够抽象（例如，LongList 里面）✅
6. 问题：注意解耦（例如，randomStringArrayApi）✅
7. 问题：父元素声明 fixed 即可，子元素没必要都声明为 fixed ✅
