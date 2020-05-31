# 阻止浏览器回退的解决思路(popstate)

## 1. 需求目的：

用户填写表单时，需要监听浏览器返回按钮，当用户点击浏览器返回时需要提醒用户是否离开。如果不需要，则需要阻止浏览器回退

## 2. 实现原理：监听 popstate 事件

popstate，MDN 的解释是：当浏览器的活动历史记录条目更改时，将触发 popstate 事件。

触发条件：当用户点击浏览器回退或者前进按钮时、当 js 调用 history.back,history.go, history.forward 时

但要特别注意：当 js 中 pushState, replaceState 并不会触发 popstate 事件

```
window.addEventListener('popstate', function(state) {
	console.log(state) // history.back()调用后会触发这一行
})
history.back()
```

目前还没有能直接阻止浏览器回退的 API，所以我们可以 hack 一下，利用 pushState 和 popstate 实现效果。

原理是进入页面时，手动 pushState 一次，此时浏览器记录条目会自动生成一个记录，history 的 length 加 1。接着，监听 popstate 事件，被触发时，出弹窗给用户确认，点取消，则需要再次 pushState 一次以恢复成没有点击前的状态，点确定，则可以手动调用 history.back 即可实现效果

## 3. 实现代码

```
window.onload = (event) => {
	window.count = 0;
	window.addEventListener('popstate', (state) => {
		console.log('onpopState invoke');
		console.log(state);
		console.log(`location is ${location}`);
		var isConfirm = confirm('确认要返回吗?');
		if (isConfirm) {
			console.log('I am going back');
			history.back();
		} else {
			console.log('push one');
			window.count++;
			const state = {
				foo: 'bar',
				count: window.count,
			};
			history.pushState(
				state,
				'test'
				// `index.html?count=${
				// 	window.count
				// }&timeStamp=${new Date().getTime()}`
			);
			console.log(history.state);
		}
	});

	console.log(`first location is ${location}`);
	// setTimeout(function () {
	window.count++;
	const state = {
		foo: 'bar',
		count: window.count,
	};
	history.pushState(
		state,
		'test'
		// `index.html?count=${window.count}&timeStamp=${new Date().getTime()}`
	);
	console.log(`after push state locaiton is ${location}`);
	// }, 0);
};
```

## 实现效果

![test1](http://qiniu.luotuxiu.cn/img/test1.gif)

## 坑的地方

1. 某些情况下 chrome 不生效

在某些情况下点击回退，不会触发 popstate 事件，具体原因我的理解是，chrome 本身做了处理，因为滥用 popstate 去控制用户回退，谷歌认为对用户体验不好，所以会直接忽视中间那页，直接返回。具体可以看一下[英文博客](https://nakedsecurity.sophos.com/2019/05/09/chrome-plans-to-save-you-from-sites-that-mess-with-your-back-button/)

> Previously, if you were on site A and clicked a link to go to nuisance site B, site B could automatically use pushState to add itself to your history and keep doing it, meaning you’d never get back to site A. Now, if the user didn’t click on something to request it, the browser will ignore the entry. As soon as the user clicks the back button, they can return to site A.

2. 某些情况下 chrome 不生效，但加了表单又可以生效

同样是 1 的理由，我猜测是 chrome 对用户行为做了一定的监测，如果页面都没有任何的用户交互，那么谷歌认为是可以直接返回的，如果有用户交互了比如填写了表单内容，则需要触发 popstate 事件

3. 如果本地调试，双击 demo.html file 打开 chrome 浏览器会发生 pushstate 发生在 navigate 事件之前导致失效

![20200531170104](http://qiniu.luotuxiu.cn/img/20200531170104.png)

解决思路：暂无
