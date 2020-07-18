# react-原生事件和合成事件的区别及源码分析

## 概念

```
class EventClickDemo extends React.Component {
	constructor(props) {
		super(props)
		this.btnRef = React.createRef()
	}
	componentDidMount() {
		// 这里就是js原生事件
		this.btnRef.current.addEventListener('click', function(e) {
			console.log('native event')
			console.log(e)
		})
	}
	handleClick(event) {
		// 这里就是合成事件，指的是react封装的SyntheticEvent
		console.log('react event')
		console.log(event)
	}
	render() {
		return (
			<div onClick={this.handleClick} ref={this.btnRef}>Click me</div>
		)
	}
}
```

## 关于 react 合成事件

### 目的：

1. 封装事件，实现跨平台，把差异封装在底层
2. 将事件全部统一冒泡到 document 再进行触发
3. 可以统一命名，这样子命名符合 react 编程习惯，比如点击事件 onClick，点击事件（捕获阶段）onClickCapture

### api:

```
boolean bubbles // 是否冒泡
boolean cancelable // 是否可以取消
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent // 相当于原生事件的event
void preventDefault() // 封装的阻止默认行为
boolean isDefaultPrevented()
void stopPropagation() // 阻止冒泡
boolean isPropagationStopped() // 是否设置了阻止冒泡
void persist()
DOMEventTarget target // 相当于原生事件中的event.target
number timeStamp
string type
```

## 原生事件和合成事件差异

### 阻止冒泡的方式

> 合成事件，在 reactV0.14 版本前，事件处理函数返回 false，无法阻止事件冒泡。

> 原生事件，事件处理函数返回 false，可以阻止事件冒泡

### 事件处理函数中的 event 能否异步访问

> 合成事件，在回调函数当前事件循环执行完后，所有 event 的属性都会无效。所以，不能在异步函数里面去访问 event

```
function handleClick(event) {
	console.log(event.type) // => 有值
	setTimeout(function() {
		console.log(event.type) // => null
	}, 0)
	this.setState({
		clickEvent: event // => null，因为在回调函数当前事件循环执行完后，所有event会变成null
	})

	this.setState){
		clickEventType: event.type // => 有值
	}
}
```

解决方案是可以在事件处理函数中使用 event.persist()。作用是告知 react 将事件从事件池（react 封装的）中移除合成事件

> 原生事件，无此限制

## 源码分析

合成事件，SyntheticEvent，源码位置在 packages/legacy-events/SyntheticEvent.js。

```
// 定义了react的事件接口
const EventInterface = {
  type: null,
  target: null,
  // currentTarget is set when dispatching; no use in copying it here
  currentTarget: function() {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null,
};


// 构造函数
function SyntheticEvent(
  dispatchConfig,
  targetInst,
  nativeEvent,
  nativeEventTarget,
) {
  if (__DEV__) {
    // these have a getter/setter for warnings
    delete this.nativeEvent;
    delete this.preventDefault;
    delete this.stopPropagation;
    delete this.isDefaultPrevented;
    delete this.isPropagationStopped;
  }

  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;
  if (!enableModernEventSystem) {
    this._dispatchListeners = null;
    this._dispatchInstances = null;
  }

  const Interface = this.constructor.Interface;
  for (const propName in Interface) { // 这里是将原生事件的值，一一赋值给合成事件的event实例对象
    if (!Interface.hasOwnProperty(propName)) { // 只考虑实例属性，继承属性无需赋值
      continue;
    }
    if (__DEV__) {
      delete this[propName]; // this has a getter/setter for warnings
    }
    const normalize = Interface[propName];
    if (normalize) { // 按照Interface的定义，就只有函数类比如timeStamp函数是有值的，所以这里是取函数
      this[propName] = normalize(nativeEvent);
    } else {
      if (propName === 'target') { // 复制target
        this.target = nativeEventTarget;
      } else { // 复制到实例对象的属性，this
        this[propName] = nativeEvent[propName];
      }
    }
  }

	// 设置是否取消默认行为
  const defaultPrevented =
    nativeEvent.defaultPrevented != null
      ? nativeEvent.defaultPrevented
      : nativeEvent.returnValue === false;
  if (defaultPrevented) {
    this.isDefaultPrevented = functionThatReturnsTrue;
  } else {
    this.isDefaultPrevented = functionThatReturnsFalse;
  }
  this.isPropagationStopped = functionThatReturnsFalse; // 默认不取消冒泡
  return this;
}

SyntheticEvent.Interface = EventInterface; // 将前面定义的接口对象存成合成事件的接口
```

更多接口实现：

```
Object.assign(SyntheticEvent.prototype, {
  preventDefault: function() { // preventDefault的实现
    this.defaultPrevented = true;
    const event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.preventDefault) {
      event.preventDefault();
    } else if (typeof event.returnValue !== 'unknown') {
      event.returnValue = false;
    }
    this.isDefaultPrevented = functionThatReturnsTrue;
  },

  stopPropagation: function() { // stopPropagation的实现
    const event = this.nativeEvent;
    if (!event) {
      return;
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else if (typeof event.cancelBubble !== 'unknown') {
      // The ChangeEventPlugin registers a "propertychange" event for
      // IE. This event does not support bubbling or cancelling, and
      // any references to cancelBubble throw "Member not found".  A
      // typeof check of "unknown" circumvents this issue (and is also
      // IE specific).
      event.cancelBubble = true;
    }

    this.isPropagationStopped = functionThatReturnsTrue;
  },

  /**
   * We release all dispatched `SyntheticEvent`s after each event loop, adding
   * them back into the pool. This allows a way to hold onto a reference that
   * won't be added back into the pool.
   */
  persist: function() {
    // Modern event system doesn't use pooling.
    if (!enableModernEventSystem) {
      this.isPersistent = functionThatReturnsTrue;
    }
  },

  /**
   * Checks if this event should be released back into the pool.
   *
   * @return {boolean} True if this should not be released, false otherwise.
   */
  isPersistent: enableModernEventSystem
    ? functionThatReturnsTrue
    : functionThatReturnsFalse,
  },
});
```

更多精彩文章可以看[我的博客](https://www.luotuxiu.cn/)，如有错误，欢迎指正，共同进步
