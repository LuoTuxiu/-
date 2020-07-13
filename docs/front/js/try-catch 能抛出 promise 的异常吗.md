# try-catch 能抛出 promise 的异常吗

## try-catch 能抛出 promise 的异常吗？

```
try {
	throw new Error('1')
} catch(error) {
	console.log(error)
}
```

这是最常见的 try-catch，会 log 下面的内容：

![20200712103919](http://qiniu.luotuxiu.cn/img/20200712103919.png)

注意，这里并不是红色的，因为 js 异常被捕获后，js 是能够正常往下执行的，如果没有被捕获的话，那么 js 将抛出异常，js 执行将会停止！

例子:

```
// 异步，宏任务
try {
	setTimeout(function() {
		console.log(b);
	}, 0);
} catch (error) {
	console.log(error); // 这里是不会执行的
}
console.log('out try catch')
```

![20200712095649](http://qiniu.luotuxiu.cn/img/20200712095649.png)

此时 js 会抛出异常，catch 后面的代码都不会执行

```
// 异步，微任务
try {
	new Promise(() => {
		throw new Error('new promise throw error');
	});
} catch (error) {
	console.log(error);
}
```

![20200712103451](http://qiniu.luotuxiu.cn/img/20200712103451.png)

## 解释

try-catch 主要用于捕获异常，注意，这里的异常，是指同步函数的异常，如果 try 里面的异步方法出现了异常，此时**catch 是无法捕获到异常的**，原因是因为：当异步函数抛出异常时，对于宏任务而言，执行函数时已经将该函数推入栈，此时并不在 try-catch 所在的栈，所以 try-catch 并不能捕获到错误。对于微任务而言，比如 promise，promise 的构造函数的异常只能被自带的 reject 也就是.catch 函数捕获到。

## 解决方案

### 对于同步函数

放心用 try-catch 即可

### 对于异步函数-宏任务

window 有全局的错误捕获函数 onerror

```
try {
	setTimeout(function() {
		console.log(b);
	}, 0);
} catch (error) {
	console.log(error); // 这里是不会执行的
}
window.onerror = function() {
	console.log(...arguments)
}
```

这时，是可以捕获到比如 setTimeout 的回调函数异常的，这里可以针对全局的异常做一些处理，比如数据上报等

![20200712105051](http://qiniu.luotuxiu.cn/img/20200712105051.png)

### 对于异步函数-微任务

对于微任务，js 有专门捕获没有写 catch 的 promise，如下：

```
window.addEventListener('unhandledrejection', function() {
	console.log(...arguments)
})
```

执行结果如下：

![20200712113354](http://qiniu.luotuxiu.cn/img/20200712113354.png)

## 更多知识点

try-catch 中的异常只会抛出一层，即不会冒泡，也就是如果你有多层的 try-catch 然后异常已经被内层的 catch 捕获了，外层的 catch 是捕获不到异常的

```
try {
  try {
    throw new Error('oops');
  }
  catch (ex) {
    console.error('inner', ex.message);
  }
  finally {
    console.log('finally');
  }
}
catch (ex) {
  console.error('outer', ex.message);
}

// Output:
// "inner" "oops"
// "finally"
```

解决方案是可以在内层的 catch 再手动 throw 出异常

更多精彩文章可以看[我的博客](https://www.luotuxiu.cn/)，如有错误，欢迎指正
