# 父元素flex 1时，子元素撑开父元素的原始宽度/高度

场景：当元素A是flex 1布局时，仅能决定该元素A撑到父元素的边界，但是如果该元素A的子元素超出A的宽度（或者高度）时，则元素A的子元素会超出该元素A的父元素

比如：元素A是黄色部分
![](https://img-blog.csdnimg.cn/img_convert/da1d5dc370ebec7a5b83e977b729ee0b.png)

假设元素A的子元素高度设置6000px

![](https://img-blog.csdnimg.cn/img_convert/36327eb0c00c1d597e0ded81a6701fa9.png)

示例链接：http://js.jirengu.com/lovucaxena/1/edit?html,css,output