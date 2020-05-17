## 单行换行

```
<div class="text-content">
	11111111111111111111111111111111111111
</div>
```

css

```
.text-content {
  white-space: nowrap; //默认不换行
  text-overflow: ellipsis; // 若是超出，出省略号
  overflow: hidden; // 超出不显示
}
```

![20200513231320](http://qiniu.luotuxiu.cn/img/20200513231320.png)

## 多行换行

利用浮动元素的特性

https://jsbin.com/wepojiy/edit?html,css,output

https://jsbin.com/gitobud/1/edit?html,css,output
