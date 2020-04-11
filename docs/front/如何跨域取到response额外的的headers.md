# 如何跨域取到 response 额外的的 headers

[参考链接](https://stackoverflow.com/questions/37897523/axios-get-access-to-response-header-fields)

默认，跨域情况下，浏览器的 response 的 headers 只返回：

```
Cache-Control
Content-Language
Content-Type
Expires
Last-Modified
Pragma
```

如果要读取其他属性，需要在**发送的请求头端**增加以下代码：

```
'Access-Control-Expose-Headers': ['Content-Disposition']
```

即可解决
