# 前端 css 笔记以及遇到的一些坑

### 1. 关于缩放比例

```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1”>
```

后面的 initial-scale 表示初始缩放，maximum-scale 表示最大缩放比例，1 意味着不能进行缩放。

### 2.关于 inherit

```
div {
  position: relative;
}
div a {
  position: inherit;
}
```

让一个不具备继承特性的属性可以继承父元素的定义

### 3.关于 background-image 和 img 区分

本质区别：

> background-image 是背景图片，是 css 的一个样式

> \<img />是一个块状元素，它是一个图片，是 html 的一个标签

行为区别：

> background-image 是只能看的

> \<img />是一个 document 对象，它是可以操作的。比如更换 img src 的路径可以达到更换图片的目的，也可以移动它的位置，从 document 中移除等等操作

一般来说，如果是装饰性的图片就使用 background-img，如果和文体内容很相关就使用 img

Tip:
在网页加载的过程中，**以 css 背景图存在的图片 background-image 会等到结构加载完成（网页的内容全部显示以后）才开始加载**，而 html 中的标签 img 是网页结构（内容）的一部分会在加载 DOM 结构的过程中加载，换句话讲，一般来讲，网页会先加载标签 img 的内容，再加载背景图片 background-image，如果你用引入了一个很大的图片，那么在这个图片下载完成之前，img 后的内容都不会显示。而如果用 css 来引入同样的图片，网页结构和内容加载完成之后，才开始加载背景图片，不会影响你浏览网页内容。

### 4.默认 inline-block 样式会在元素之间留 4px 的空白间距，小心被坑到

```
<ul>
    <li>item1</li>
    <li>item2</li>
    <li>item3</li>
    <li>item4</li>
    <li>item5</li>
</ul>
```

```
*{
  margin: 0;
  padding: 0;
}
ul {
  list-style: none outside none;
  padding: 10px;
  background: green;
  text-align: center;
}
ul li {
  display: inline-block;
  *display: inline;
  zoom: 1;
  background: orange;
  padding: 5px;
}
```
