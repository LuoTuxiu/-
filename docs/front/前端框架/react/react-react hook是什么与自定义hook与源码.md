## react hook

关于 react hook，其实和函数式组件是比较类似的，关于类组件和函数组件的区别可以看我的这篇文章[react-类组件和函数组件的区别](http://www.luotuxiu.cn/front/%E5%89%8D%E7%AB%AF%E6%A1%86%E6%9E%B6/react/react-%E5%8E%9F%E7%94%9F%E4%BA%8B%E4%BB%B6%E5%92%8C%E5%90%88%E6%88%90%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%8C%BA%E5%88%AB.html)

react hook，可以理解成有状态的函数式组件，实际上是一个函数。看一个官方实例:

```
import React, { useState } from 'react';

function Example() {
  // 声明一个叫 “count” 的 state 变量。
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

如果我们换成 class 的写法，代码如下:

```
import React from 'react';

class Example extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			count: 0
		}
	}
	render() {
		return (
			<div>
				<p>You clicked {this.state.count} times</p>
				<button onClick={() => this.setState((count) => (count + 1)))}>
					Click me
				</button>
			</div>
		)
	}
}
```

可以对比，上述的 class 代码相对较为繁琐。虽然我们可以用高阶组件来实现进一步封装以简化代码，但是相比之下，react hook 写法更容易理解。

## 关于 hook api

### 基础 hook

#### useState

useState，实际上与 class 中的 state 状态同理，先看下源码 packages/react/src/ReactHooks.js

```
export function useState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialState);
}
```

看返回值类型，接受一个 S 类型的值，返回

```
[S, Dispatch<BasicStateAction<S>>]
```

所以 useState 的返回值的第一个变量是该状态的变量，第二个值是一个函数，约定函数名是 set+变量名，变量名首字母大写。

```
useState<S>(
	initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
	currentHookNameInDev = 'useState';
	updateHookTypesDev();
	const prevDispatcher = ReactCurrentDispatcher.current;
	ReactCurrentDispatcher.current = InvalidNestedHooksDispatcherOnUpdateInDEV;
	try {
		return updateState(initialState);
	} finally {
		ReactCurrentDispatcher.current = prevDispatcher;
	}
},
```

```
function mountState<S>(
  initialState: (() => S) | S,
): [S, Dispatch<BasicStateAction<S>>] {
  const hook = mountWorkInProgressHook();
  if (typeof initialState === 'function') {
    // $FlowFixMe: Flow doesn't like mixed types
    initialState = initialState();
  }
  hook.memoizedState = hook.baseState = initialState;
  const queue = (hook.queue = {
    pending: null,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: (initialState: any),
  });
  const dispatch: Dispatch<
    BasicStateAction<S>,
  > = (queue.dispatch = (dispatchAction.bind(
    null,
    currentlyRenderingFiber,
    queue,
  ): any));
  return [hook.memoizedState, dispatch];
}
```

```
const hook: Hook = {
	memoizedState: null,

	baseState: null,
	baseQueue: null,
	queue: null,

	next: null,
};
```

#### useEffect

#### useContext
