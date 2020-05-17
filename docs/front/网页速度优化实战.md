## Nuxt 速度优化实战

背景是谷歌统计移动端网页加载速度在 10s 左右，所以优化一波，整体优化下来能优化到 7s 左右。主要有以下思路：

1. 减少请求数和请求大小
2. 资源延迟加载或者懒加载相关资源
3. 验证 cdn 是否命中缓存
4. 优化 dns 查询
5. 优化缓存的设置
6. 利用服务端渲染特性，提前请求数据
7. 设置资源域名和主站域名不同以减少资源请求 cookie
8. 加速请求 prefetch, preload, preconnect

下面将详细介绍具体的分析过程

## 1. 减少请求数和请求大小

引用官方文档

> Nuxt.js 使用 webpack-bundle-analyzer 分析并可视化构建后的打包文件，你可以基于分析结果来决定如何优化它

方法是在 nuxt.config.js 中设置：

```
module.exports = {
 build: {
   analyze: true
   // or
   analyze: {
     analyzerMode: 'static'
   }
 }
}
```

运行 nuxt build --analyze 即可在http://localhost:8888/查看具体效果

基本思路就是分析占用的 node_modules 包是否过大，以及如果有使用私有库的话，是否能优化私有库的大小。调整完后，再配合在本地 build 出来的文件，关键看：vendors.app.js 的大小是否降下来了

## 2. 资源延迟加载或者懒加载相关资源

### async 和 defer

两者的差别列一个表

| 对比项         | async                            | defer                                |
| -------------- | -------------------------------- | ------------------------------------ |
| 开始下载时机   | 解析 html 时一遇到该语句立即下载 | 同 async                             |
| 下载完后       | 浏览器立即停止解析 html，执行 js | 浏览器在执行完其它同步脚本后执行     |
| 多个的执行顺序 | 顺序不确定，先下载完的 js 先执行 | 按照 js 的在 html 的先后位置依次执行 |

检查所有的 js 资源是否引入 async

## 3. 验证 cdn 是否命中缓存

常见的国内的 cdn 都会在响应头返回是否命中缓存：

![20200413000026](http://qiniu.luotuxiu.cn/img/20200413000026.png)

如果你的资源没有返回相关的信息，则需要去排查下了

## 4. 优化 dns 查询

可以利用 chrome 查看 dns 查询时间

![20200413002202](http://qiniu.luotuxiu.cn/img/20200413002202.png)

技巧：利用 dns-prefetch 预处理 dns

```
<link ref="dns-prefetch" href="//luotuxiu.com" />
```

先看实例，下图是淘宝的源代码

![20200413235943](http://qiniu.luotuxiu.cn/img/20200413235943.png)

强制执行特定主机，可以使用 dns-prefetch，能够让浏览器在解析 html 的时候去并行获取 dns 信息，这样就能减少后续同域名下的资源的 DNS Lookup 时间（因为已经提前获取到了）

## 5. 优化缓存的设置

关于缓存，一般可以通过 response 的 header 去看几个关键的 header 头：

1. cache-control（强缓存）

可能有三个值，max-control=xxx，no-store， no-cache

| 值       | 解释                                                               |
| -------- | ------------------------------------------------------------------ |
| no-store | 所有缓存都禁止(勾选：Disable cache 即可发现浏览器自动加上该请求头) |
| no-cache | 禁用强缓存，但是如果有协商缓存，可以使用协商缓存                   |
| max-age  | 例如：max-age=100，单位是 s，含义是 100s                           |

分类型判断：

- 通用的一般都不会有变动的，max-age 设置可以设置长一些，比如一年
- 普通的 js 或者 css 或者图片，因为现在都是加上 hash 值，更新 hash 值都会变，所以设置长也不影响，比如一年

如果缓存生效，返回的 status code 是 200

2. expire（协商缓存）

指示该文件什么时间后会过期

3. Etag（协商缓存）

代表存储在服务器端的最新的文件 hash，形如：

```
ETag: "a9a3795f8bea1349ea447253e6b828e4"
```

协商缓存时要发送 http 请求的，如果缓存生效，返回的 status code 是 304

4. Last-modified（协商缓存）

代表服务器上该文件的上一次更新时间

从优先级上讲，强缓存 > 协商缓存，浏览器先读取强缓存（浏览器不会发送 http 请求），如果强缓存失效，则读取协商缓存（浏览器会发送 http 请求）

## 6. 利用服务端渲染特性，提前请求数据

服务端渲染比单页面应用有价值的是能返回有内容的 html 给用户，给用户更早的呈现。那么其实我们可以合理得安排一些在服务端渲染阶段去做的事情，比如在服务端发送相应的接口，这样减少用户在浏览器端再次发请求，而且，服务端去发送请求比浏览器端发送快得多，而且服务端大部分是局域网

## 7. 设置资源域名和主站域名不同以减少资源请求 cookie

实际上，如果我们常见的 js，css，img 的 cdn 域名和主站域名相同的话，往往会带上我们存储在浏览器的 cookie，这无异于增加了我们的请求大小，所以，通常情况下，会设置资源域名和主站域名不同

如淘宝的源码：

![20200414001055](http://qiniu.luotuxiu.cn/img/20200414001055.png)

主站域名是：taobao.com

cdn 的域名是：alicdn.com

## 8. 加速请求 prefetch, preload, preconnect

```
<link ref="prefetch" href="//luotuxiu.cn" />
<link ref="preload" href="//luotuxiu.cn" />
<link ref="preconnect：" href="//luotuxiu.cn" />
```

> prefetch: 一般用来提前加载下一页的相关请求，比如，webpack 做了 split 分包的话，再做页面跳转的时候，用上这个就比较有用

> preload: 当你很明确有些资源是必要的且需要提前加速加载的，这时候可以使用 preload。比如，在解析 css 的时候发现需要去下载另外一个域名的字体资源，这时候就很有必要使用：preload 提前加载字体资源。

> preconnect： 首先，preconnect 包含了 dns-prefetch，它提前做了三步操作，DNS LookUp,TCP 建立握手，TLS 建立连接。所以，提前做好这个之后，后面一旦加载同主站的资源，则会省去这三步的时间。但是也有建议是，不要滥用 preconnect，最多使用 3-4 个
