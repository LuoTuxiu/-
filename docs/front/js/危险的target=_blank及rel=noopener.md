# 危险的 target=\_blank 及 rel=noopener

在编写 js 代码时有时候会出现以下报错：

jsx-no-target-blank[ESLint]

具体可以访问[源码地址](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-target-blank.md)

究其原因，是因为：默认的 a 标签链接，如果设置 target=\_blank 时，则在新窗口能够通过全局对象的 opener 属性拿到原 tab 的引用，此时可能会引发黑客攻击等危险

其中，一篇[英文博客](https://mathiasbynens.github.io/rel-noopener/)写的很好，下面引用的例子也是引用该博客的示例

## 新开窗口属于同源时

先进入https://mathiasbynens.github.io/rel-noopener/

![20200808170450](http://qiniu.luotuxiu.cn/img/20200808170450.png)

然后点击第一个示例：“Click me!!1 (same-origin)”

a 标签(Click me!!1 (same-origin))源码:

```
<a class="user-generated" href="malicious.html" target="_blank">
	<b>Click me!!1 (same-origin)</b>
</a>
```

此时，会开新 tab，进入 malicious.html 页面，其中，malicious.html 源码：

```
if (window.opener) {
	opener.location = 'https://mathiasbynens.github.io/rel-noopener/#hax';
	// Just `opener.location.hash = '#hax'` only works on the same origin.
} else {
	document.querySelector('h1').innerHTML = 'The previous tab is safe and intact. <code>window.opener</code> was <code>null</code>; mischief <em>not</em> managed!';
}
```

此时，在新开的页面打开调试，输入 opener.location, opener.document

![20200808170655](http://qiniu.luotuxiu.cn/img/20200808170655.png)

发现，是 opener 此时 operner === operner.window 的，所以在新的 tab，你可以拿着 operner 去做你任何想更改原来 tab 页面的任何事情，比如，重定向，更改 dom

然后再切回原 tab，发现网址已经变成了：https://mathiasbynens.github.io/rel-noopener/#hax

![20200808170520](http://qiniu.luotuxiu.cn/img/20200808170520.png)

## 当新开 tab 与原网页属于跨域时

点击 a 标签：Click me!!1 (cross-origin)

```
<a class="user-generated" href="https://mathiasbynens.be/demo/opener" target="_blank">
	<b>Click me!!1 (cross-origin)</b>
</a>
```

同样，https://mathiasbynens.be/demo/opener的源码和上面同源情况一样：

```
if (window.opener) {
	opener.location = 'https://mathiasbynens.github.io/rel-noopener/#hax';
} else {
	document.querySelector('h1').innerHTML = 'The previous tab is safe and intact. <code>window.opener</code> was <code>null</code>; mischief <em>not</em> managed!';
}
```

此时，在新开的页面打开调试，输入 opener.location, opener.document

![20200808171342](http://qiniu.luotuxiu.cn/img/20200808171342.png)

会发现，document 的里面的值因为跨域获取不到了，location 是一个空对象，但点击展开仍可以看到 href、replace 两个 key。我们试试重定向

![test2](http://qiniu.luotuxiu.cn/img/test2.gif)

然后再切回原 tab，发现网址已经变成了：https://mathiasbynens.github.io/rel-noopener/#hax

![20200808171118](http://qiniu.luotuxiu.cn/img/20200808171118.png)

说明，在跨域情况下，也是能够部分控制原 tab 的，所以黑客可以在拿到 opener 后，控制原 tab 重定向到一个和原网址长得很像的一个 url，此时用户并不知道 url 被替换了，如果被引导输入了账号密码，则会出现信息泄露造成攻击

## 解决方案：rel=noopener

给 a 标签加入 rel=noopener，对于旧浏览器，可以使用 rel=noreferrer

noopener 兼容性如下：

![20200810221103](http://qiniu.luotuxiu.cn/img/20200810221103.png)

noreferrer 兼容性如下：

![20200810221221](http://qiniu.luotuxiu.cn/img/20200810221221.png)

更多精彩文章可以看[我的博客](https://www.luotuxiu.cn/)，如有错误，欢迎指正，共同进步
