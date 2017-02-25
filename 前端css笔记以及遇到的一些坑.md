# 前端css笔记以及遇到的一些坑

标签（空格分隔）： css

---
###1.
```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1”>
```
后面的initial-scale表示初始缩放，maximum-scale表示最大缩放比例，1意味着不能进行缩放。

###2.关于inherit
```
div {
        position: relative;
}
div a {
        position: inherit;
}
```

让一个不具备继承特性的属性可以继承父元素的定义

###3.关于background-image和img区分
 background-image是背景图片，是css的一个样式

    <img />是一个块状元素，它是一个图片，是html的一个标签

    background-image是只能看的

     <img />是一个document对象，它是可以操作的。比如更换img src的路径可以达到更换图片的目的，也可以移动它的位置，从document中移除等等操作

    background是CSS3的样式

    img 是HTML的标签，两者之间存在本质的区别

    background-image存在于大的background中，其属性设置多种多样，变换较为丰富

    img 上能写字，能增加其余想增加的元素

    一般来说，如果是装饰性的图片就使用background-img，如果和文体内容很相关就使用img
tips: 
在网页加载的过程中，**以css背景图存在的图片background-image会等到结构加载完成（网页的内容全部显示以后）才开始加载**，而html中的标签img是网页结构（内容）的一部分会在加载结构的过程中加载，换句话讲，网页会先加载标签img的内容，再加载背景图片background-image，如果你用引入了一个很大的图片，那么在这个图片下载完成之前，img后的内容都不会显示。而如果用css来引入同样的图片，网页结构和内容加载完成之后，才开始加载背景图片，不会影响你浏览网页内容。

###4.默认inline-block样式会在元素之间留4px的空白间距，小心被坑到
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

###5.