## 1.如何监听一个对象的变化

```
let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

// 要实现的结果如下：
app1.data.name // 你访问了 name
app.data.age = 100;  // 你设置了 age，新q的值为100
app2.data.university // 你访问了 university
app2.data.major = 'science'  // 你设置了 major，新的值为 science

```

知识点 1：
[github vue 源码 1](https://github.com/youngwind/blog/issues/84)

### 1.关于 Object.defineProperty

#### 1.

```
var a = {};

Object.defineProperty(o, "b", {
    value : 123,
    writable : false });

console.log(a.b); // 打印 37
a.b = 25; // 没有错误抛出（在严格模式下会抛出，即使之前已经有相同的值）
console.log(o.a); // 打印 37， 赋值不起作用
```

#### 2. enumerable

属性特性 enumerable 定义了对象的属性是否可以在 for...in 循环和 Object.keys() 中被枚举

#### 3.

想用 get 和 set，就不能用 writable 或 value 中的任何一个

#### 4.看源码

src/core/observer/index.js

```
/**
 * Define a reactive property on an Object.
 */
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
  customSetter?: ?Function,
  shallow?: boolean
) {
  const dep = new Dep()

  const property = Object.getOwnPropertyDescriptor(obj, key)
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get
  const setter = property && property.set

  let childOb = !shallow && observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      const value = getter ? getter.call(obj) : val
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
        }
        if (Array.isArray(value)) {
          dependArray(value)
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      const value = getter ? getter.call(obj) : val
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter()
      }
      if (setter) {
        setter.call(obj, newVal)
      } else {
        val = newVal
      }
      childOb = !shallow && observe(newVal)
      dep.notify()
    }
  })
}
```

## 2.发布-订阅模式

[发布订阅模式](http://ife.baidu.com/course/detail/id/20)

### 1.

nodejs 核心模块 Events 提供 EventEmitter 对象，也实现了分布式事件。如下代码

```
var Emitter = require('events').EventEmitter;

var emitter = new Emitter();

emitter.on('someEvent',function(stream){

console.log(stream + 'from eventHandler1');

});

emitter.on('someEvent',function(stream){

console.log(stream + 'from eventHandler2');

});

emitter.emit('someEvent','I am a stream!');
```

### 2.步骤 1.首先要指定好谁当发布者； 2.给发布者添加一个缓存列表，用以存放回调函数，以便通知订阅者； 3.发布消息时，遍历缓存列表，依次触发存放的订阅者回调函数

### 3.

vue 源码：
src/core/instance/events.js

## 3.事件冒泡

### 1.

[关于事件冒泡](http://coderlt.coding.me/2016/11/22/js-event/)

```
// DOM2级事件
el.addEventListener(event-name, callback, useCapture)
```

- event-name: 事件名称，可以是标准的 DOM 事件
- callbakc: 回调函数，当事件触发时，函数会被注入一个参数为当前的事件对象 event
- useCapture: 是否以捕获的方式触发，默认为 false

```
IE9以下的IE浏览器使用的是事件冒泡，先从具体的接收元素，然后逐步向上传播到不具体的元素。
Netscapte采用的是事件捕获，先由不具体的元素接收事件，最具体的节点最后才接收到事件。
而W3C制定的Web标准中，是同时采用了两种方案，事件捕获和事件冒泡都可以。
```

```
e.stopPropagation() // 用于阻止事件的继续传递
```

## 4.

## 5.

## 6.对比 angular.js

### 1.

[介绍](http://xiy.red/2017/03/12/angularjs-digest/)

## 7.对比 react
