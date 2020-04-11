# const 定义不可变数组

有个常见的面试题，我们知道，const 是 es6 中新增用于定义常量。但是对于引用类型来说，const 所说的常量，是指，对应的指针或者说地址是常量。那么，如果我们要求，我们定义的数组里面的元素也是不可改变的呢？先来看现象

```
const a = [1, 2, 3];
console.log(a);
a[0] = 4;
console.log(a)
```

输出是

```
[1, 2, 3]
[4, 2, 3]
```

可以简单，用 const 定义的数组，里面的元素是可变的

那么，考虑到，数组其实也是继承于对象，那么，根据下面三个规则

1. Object.preventExtendsion(obj) 用来禁止对象可扩展其它属性
2. Object.seal(obj)用来禁止对象删除其它属性和扩展其它属性
3. Object.freeze(obj)用来冻结对象，就是所有的属性不能够更改和新增

### 关于 Object.preventExtendsion

来看第一种方案

```
const a = [1, 2, 3, {second: 11}];
console.log(a);
console.log(Object.getOwnPropertyDescriptor(a, 0));
Object.preventExtensions(a); // 开始锁定对象
a[4] = 4;
console.log(a)
console.log(Object.getOwnPropertyDescriptor(a, '1'));
console.log(Object.isExtensible(a));
delete a[0];
console.log(a);
```

输出如下：

```
[1, 2, 3, [object Object] {
  second: 11
}]
[object Object] {
  configurable: true,
  enumerable: true,
  value: 1,
  writable: true
}
[1, 2, 3, [object Object] {
  second: 11
}]
[object Object] {
  configurable: true,
  enumerable: true,
  value: 2,
  writable: true
}
false
[undefined, 2, 3, [object Object] {
  second: 11
}]
```

由此可见，preventExtensions 可以阻止对象新增属性。但是原对象依旧可以改删其它原有属性，

### 关于 object.seal

```
const a = [1, 2, 3, {second: 11}];
console.log(a);
console.log(Object.getOwnPropertyDescriptor(a, 0));
Object.seal(a);
a[4] = 4;
console.log(a);
console.log(Object.getOwnPropertyDescriptor(a, '1'));
console.log(Object.isExtensible(a));
delete a[0];
console.log(a);
a[0] = 5;
console.log(a);
```

输出如下：

```
[1, 2, 3, [object Object] {
  second: 11
}]
[object Object] {
  configurable: true,
  enumerable: true,
  value: 1,
  writable: true
}
[1, 2, 3, [object Object] {
  second: 11
}]
[object Object] {
  configurable: false,
  enumerable: true,
  value: 2,
  writable: true
}
false
[1, 2, 3, [object Object] {
  second: 11
}]
[1, 2, 3, [object Object] {
  second: 11
}]
```

可以看到，configurable 已经变成了 false，说明是不可以删除的，后面的 delete 操作也是无效。**但是，对象里面的值却是可以更改的**

### 关于 Object.freeze

所以，有了以下方案：

```
const a = [1, 2, 3];
console.log(a);
Object.freeze(a);
a[0] = 4;
console.log(a)
```

输出如下

```
[1, 2, 3]
[1, 2, 3]
```

由此可见，对象里面的元素也是不可变的

再来试验，如果对应的 value 不是个简单数据类型呢，比如如下

```
const a = [1, 2, 3, {second: 11}];
console.log(a);
console.log(Object.getOwnPropertyDescriptor(a, 0));
Object.freeze(a);
a[4] = 4;
console.log(a);
console.log(Object.getOwnPropertyDescriptor(a, '1'));
console.log(Object.isExtensible(a));
delete a[0];
console.log(a);
```

输出如下

```

[1, 2, 3, [object Object] {
  second: 11
}]
[object Object] {
  configurable: true,
  enumerable: true,
  value: 1,
  writable: true
}
[1, 2, 3, [object Object] {
  second: 11
}]
[object Object] {
  configurable: false,
  enumerable: true,
  value: 2,
  writable: false
}
false
[1, 2, 3, [object Object] {
  second: 11
}]
```

证明，还是不可变的
