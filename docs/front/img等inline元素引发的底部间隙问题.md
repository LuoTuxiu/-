## img 等 inline 元素引发的底部间隙问题

一个经典的现象：

html 部分

```
<div class="content">
  <img class="image" src=".jpg" alt="">
</div>
```

css 部分

```
.image{
  width: 200px;
}
```

结果如下

![图1](https://user-gold-cdn.xitu.io/2018/7/5/1646a89b850ddcca?w=960&h=410&f=png&s=127212)
图 1

上图可以看到，父元素比图片还多了 3~5px 的高度，用 chrome 调试又发现不属于任何的 margin 和 padding。那么，原因何在呢？

**根本原因是 css 中默认 baseline 的问题**

为了更加具体，我们给图片后面添加文字，代码如下：

html 部分

```
<div class="content">
  <img class="image" src=".jpg" alt=""><span>xyz9</span>
</div>
```

css 部分为：

```
*{
  padding: 0;
  margin: 0;
}

.content{
  background: orange;
}
.topLogo{
  width: 200px;
  height: 200px;
  background-color: green;
}
span{
  background: red;
}

```

效果如下：

![图2](https://user-gold-cdn.xitu.io/2018/7/6/1646d08861cabd13?w=764&h=426&f=png&s=115775)
图 2

首先，要知道，CSS 的属性 vertical-align 用来指定**行内元素（inline）或表格单元格（table-cell）元素**的垂直对齐方式。
可以看到，vertical-align 常见的有 4 种基线：top、middle、baseline（默认）、bottom

![图3](https://user-gold-cdn.xitu.io/2018/7/6/1646d9c7cbb9f786?w=1366&h=900&f=png&s=71984)
图 3

所以，由图 3 可以理解了图 2，默认的对齐 baseline 对齐方式，导致默认底部有留白。

所以，最直接的修正做法可以是

#### 解法 1

```
*{
  padding: 0;
  margin: 0;
}

.content{
  background: orange;
}
.topLogo{
  width: 200px;
  height: 200px;
  background-color: green;
  vertical-align: bottom; // 把基线对齐方式改成bottom即可
}
span{
  background: red;
}
```

#### 解法 2

网上有这种解法：

```
*{
  padding: 0;
  margin: 0;
}

.content{
  background: orange;
  line-height: 0; // 设置父元素的line-height为0
}
.topLogo{
  width: 200px;
  height: 200px;
  background-color: green;
}
span{
  background: red;
}
```

但这种解法有不妥，因为如果 content 还有子元素比如文字之类的，就会出现：

![图4](https://user-gold-cdn.xitu.io/2018/7/6/1646da7f043cfba8?w=950&h=446&f=png&s=124688)

图 4

同理，对父元素设置 font-size = 0，也会对文字产生影响

#### 解法 3

既然要消除默认 baseline 的影响，那么让 vertical-aling 失效即可，所以，考虑让图片变成 block;

```
*{
  padding: 0;
  margin: 0;
}

.content{
  background: orange;
}
.topLogo{
  width: 200px;
  height: 200px;
  background-color: green;
  display: block; // 增加了这行
}
span{
  background: red;
}
```

![图5](https://user-gold-cdn.xitu.io/2018/7/6/1646dad37de99dee?w=946&h=442&f=png&s=118349)

图 5

可以看到，间隙已经去掉；
不过有产生副作用

本文参考了链接

[CSS 深入理解 vertical-align 和 line-height 的基友关系-张鑫旭](https://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/)

[img 的间隙](https://segmentfault.com/a/1190000006808606)

文章如有错误，欢迎随时指出
