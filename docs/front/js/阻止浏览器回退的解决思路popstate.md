# 多页面阻止浏览器回退的解决思路(popstate)

## 需求目的：

用户填写表单时，需要监听浏览器返回按钮，当用户点击浏览器返回时需要提醒用户是否离开。如果不需要，则需要阻止浏览器回退

## 实现原理：监听 popstate 事件

popstate，MDN 的解释是：当浏览器的活动历史记录条目更改时，将触发 popstate 事件。

触发条件：当用户点击浏览器回退或者前进按钮时、当 js 调用 history.back,history.go, history.forward 时

但要特别注意：当 js 中 pushState, replaceState 并不会触发 popstate 事件

```
window.addEventListener('popstate', function(state) {
	console.log(state) // history.back()调用后会触发这一行
})
history.back()
```

目前多页面还没有能直接阻止浏览器回退的 API，所以我们可以 hack 一下，利用 pushState 和 popstate 实现效果。

原理是进入页面时，手动 pushState 一次，此时浏览器记录条目会自动生成一个记录，history 的 length 加 1。接着，监听 popstate 事件，被触发时，出弹窗给用户确认，点取消，则需要再次 pushState 一次以恢复成没有点击前的状态，点确定，则可以手动调用 history.back 即可实现效果

## 框架图

![20200607233903](http://qiniu.luotuxiu.cn/img/20200607233903.png)

## 实现代码

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

## vue-router 源码中用到的 popstate 解读

vue-router 主要用来做单页面，即更改 url 无需刷新能够渲染部分组件达到渲染不同页面的效果，其中 history 模式监听 url 的变化的也是由 popstate 实现的，然后监听浏览器返回的方法也是大同小异。

**原理是，A url-> B url，此时用户点击返回时，url 先回退到 A url，此时触发 popstate 回调，vuerouter 根据 next 回调传参是 false 判断需要修成 A url 成 B url，此时需要将进行 pushstate（B url），则此时就实现了阻止浏览器回退的效果**

源码参见 src/history/html5.js（注意看中文注释）

先看使用方法：

```
  beforeRouteLeave (to, from, next) { // url离开时调用的钩子函数
    if (
      this.saved ||
      window.confirm('Not saved, are you sure you want to navigate away?')
    ) {
      next()
    } else {
      next(false) // 调用next(false) 就实现了阻止浏览器返回，请看下面
    }
  }
```

```
  setupListeners () {
		// 为简略，省略部分源码
    const handleRoutingEvent = () => {
      const current = this.current

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      const location = getLocation(this.base)
      if (this.current === START && location === this._startLocation) {
        return
      }

      this.transitionTo(location, route => { // 这里调用自定义的transitionTo方法，其实就是去执行一些队列，包括各种钩子函数
        if (supportsScroll) {
          handleScroll(router, route, current, true)
        }
      })
    }
    window.addEventListener('popstate', handleRoutingEvent) // 在这里添加popstate监听函数
    this.listeners.push(() => {
      window.removeEventListener('popstate', handleRoutingEvent)
    })
  }
```

下面看 transitionTo 的定义，参见 src/history/base.js

```
  transitionTo (
    location: RawLocation,
    onComplete?: Function,
    onAbort?: Function
  ) {
    const route = this.router.match(location, this.current)
    this.confirmTransition( // 调用自身的confirmTransition方法
      route,
      // 为简略，省略部分源码
    )
  }

  confirmTransition (route: Route, onComplete: Function, onAbort?: Function) {
    const current = this.current
    const abort = err => {
      // changed after adding errors with
      // https://github.com/vuejs/vue-router/pull/3047 before that change,
      // redirect and aborted navigation would produce an err == null
      if (!isRouterError(err) && isError(err)) {
        if (this.errorCbs.length) {
          this.errorCbs.forEach(cb => {
            cb(err)
          })
        } else {
          warn(false, 'uncaught error during route navigation:')
          console.error(err)
        }
      }
      onAbort && onAbort(err)
    }
    if (
      isSameRoute(route, current) &&
      // in the case the route map has been dynamically appended to
      route.matched.length === current.matched.length
    ) {
      this.ensureURL()
      return abort(createNavigationDuplicatedError(current, route))
    }

    const { updated, deactivated, activated } = resolveQueue(
      this.current.matched,
      route.matched
    )

    const queue: Array<?NavigationGuard> = [].concat( // 定义队列
      // in-component leave guards
      extractLeaveGuards(deactivated), // 先执行当前页面的beforeRouteLeave
      // global before hooks
      this.router.beforeHooks, // 执行新页面的beforeRouteUpdate
      // in-component update hooks
      extractUpdateHooks(updated),
      // in-config enter guards
      activated.map(m => m.beforeEnter),
      // async components
      resolveAsyncComponents(activated)
    )

    this.pending = route
    const iterator = (hook: NavigationGuard, next) => { // iterator将会在queue队列中一次被执行，参见src/utils/async
      if (this.pending !== route) {
        return abort(createNavigationCancelledError(current, route))
      }
      try {
        hook(route, current, (to: any) => {
          if (to === false) { // next(false) 执行的是这里
            // next(false) -> abort navigation, ensure current URL
            this.ensureURL(true) // 关键看这里：请看下面ensureURL的定义，传true则是pushstate
            abort(createNavigationAbortedError(current, route))
          } else if (isError(to)) {
            this.ensureURL(true)
            abort(to)
          } else if (
            typeof to === 'string' ||
            (typeof to === 'object' &&
              (typeof to.path === 'string' || typeof to.name === 'string'))
          ) {
            // next('/') or next({ path: '/' }) -> redirect
            abort(createNavigationRedirectedError(current, route))
            if (typeof to === 'object' && to.replace) {
              this.replace(to)
            } else {
              this.push(to)
            }
          } else {
            // confirm transition and pass on the value
            next(to)
          }
        })
      } catch (e) {
        abort(e)
      }
    }
		// 为简略，省略部分源码
  }
```

eusureURL 的定义，参见 src/history/html5.js

```
  ensureURL (push?: boolean) {
    if (getLocation(this.base) !== this.current.fullPath) {
      const current = cleanPath(this.base + this.current.fullPath)
      push ? pushState(current) : replaceState(current) // 执行一次pushstate
    }
  }
```

更多精彩文章可以看[我的博客](https://www.luotuxiu.cn/)，如有错误，欢迎指正，共同进步
