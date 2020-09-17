## facebook 分享

官方英文文档：https://developers.facebook.com/docs/sharing/

分享原理：facebook 爬虫机器人会去向要分享的 url 访问，拿到对应的 html 解析，分别拿到相应的 html 元素图谱

![20200917231408](https://img-blog.csdnimg.cn/img_convert/e15ac6e3ed87c53346ff2a571d22932a.png)

### 步骤 1 facebook 后台设置 App Domains

比如，分享的地址是https://www.luotuxiu.cn/，则设置App Domains 为 luotuxiu.cn

### 步骤 2

方式 1：直接 url 分享(注意 url 需要 encode)

```
https://www.facebook.com/dialog/share?
  app_id=1032705147200897
  &display=popup
  &href=https%3A%2F%2Fwww.luotuxiu.cn%2F
  &redirect_uri=https%3A%2F%2Fwww.luotuxiu.cn%2F
```

方式 2：接入 facebook sdk（前提是先引入 facebook sdk js，并做初始化）

```
FB.ui({
  method: 'share',
  href: 'https://developers.facebook.com/docs/',
}, function(response){});
```

### facebook 分享官方 debugger 工具

https://developers.facebook.com/tools/debug/

比如输入我的博客地址，可以看到以下截图：

![20200915230011](https://img-blog.csdnimg.cn/img_convert/ce11c4cb21c0dafc1613579e78ca57d5.png)

```
<meta property="og:url" content="http://www.nytimes.com/2015/02/19/arts/international/when-great-minds-dont-think-alike.html" />
<meta property="og:type" content="article" />
<meta property="og:title" content="When Great Minds Don’t Think Alike" />
<meta property="og:description" content="How much does culture influence creative thinking?" />
<meta property="og:image" content="http://static01.nyt.com/images/2015/02/19/arts/international/19iht-btnumbers19A/19iht-btnumbers19A-facebookJumbo-v2.jpg" />
```

| Tag            | Description                                                                                                                                                                                                                                                                                                                                                                  | 备注                     |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| og:url         | The canonical URL for your page. This should be the undecorated URL, without session variables, user identifying parameters, or counters. Likes and Shares for this URL will aggregate at this URL. For example, mobile domain URLs should point to the desktop version of the URL as the canonical URL to aggregate Likes and Shares across different versions of the page. | 填写要分享的 url         |
| og:title       | The title of your article without any branding such as your site name.                                                                                                                                                                                                                                                                                                       | 分享时展示的卡片的标题   |
| og:description | A brief description of the content, usually between 2 and 4 sentences. This will displayed below the title of the post on Facebook.                                                                                                                                                                                                                                          | 分享时展示的卡片的此标题 |
| og:image       | The URL of the image that appears when someone shares the content to Facebook. See below for more info, and check out our best practices guide to learn how to specify a high quality preview image.                                                                                                                                                                         | 分享时展示的卡片的背景图 |
| fb:app_id      | In order to use Facebook Insights you must add the app ID to your page. Insights lets you view analytics for traffic to your site from Facebook. Find the app ID in your App Dashboard.                                                                                                                                                                                      |                          |

> 这个 debugger 工具很关键，其一，可以用来分析自己的网站是否爬虫元信息是否准确，二来，因为是爬虫的原理，就可能出现，**网站更新了但是分享的内容没有及时更新的 bug**，此时这个工具会有一个 scrape Again 的功能，可以手动触发爬虫

## facebook 登录

官网地址：https://developers.facebook.com/docs/facebook-login/web/

接入 facebook 登录需要引入 facebook sdk，共计需要 5 个步骤

### 1. 引入 cdn 链接（国内需要注意是否能访问此 CDN）

```
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
```

### 2. 去官网创建一个应用，对应一个 Appid

### 3. 去官网新增 facebook login 功能，点击左边的 PRODUCT +，选择 facebook login 一步一步操作就好，这里注意：

Valid OAuth Redirect URIs：这个是回调地址，必填。也就是，你想要哪个网址使用 facebook 登录，就填哪个网址，一般来讲，填写通用地址接口，比如填写：https://www.luotuxiu.cn/ 即可，后面文件名可以不用填写。

### 4. 初始化 sdk:

```
FB.init({
  appId      : '{app-id}', // 这里填入第2步的appid
  cookie     : true,                     // Enable cookies to allow the server to access the session.
  xfbml      : true,                     // Parse social plugins on this webpage.
  version    : '{api-version}'           // Use this Graph API version for this call.
});
```

### 5. 使用登录 api

```
FB.login(function(response){
  if (response.status === 'connected') {
    // Logged into your webpage and Facebook.
  } else {
    // The person is not logged into your webpage or we are unable to tell.
  }
});
```

response 的示例：

```
{
    status: 'connected',
    authResponse: {
        accessToken: '{access-token}',
        expiresIn:'{unix-timestamp}',
        reauthorize_required_in:'{seconds-until-token-expires}',
        signedRequest:'{signed-parameter}',
        userID:'{user-id}'
    }
}
```

一般拿着 accessToken 去做登录态也可以，有一个接口可以校验登录态是否生效

```
FB.getLoginStatus(function(response) {   // See the onlogin handler
  statusChangeCallback(response);
});
```

同时也有一个 get 请求可以校验 token 是否生效：

```
GET graph.facebook.com/debug_token?
     input_token={token-to-inspect}
     &access_token={app-token-or-admin-token}
```

其中，input_token 是你要校验的 token，access_token 是在 facebook 后台对应的这个 app 的 token。如果正确，返回值如下：

```
{
    "data": {
        "app_id": 138483919580948,
        "type": "USER",
        "application": "Social Cafe",
        "expires_at": 1352419328,
        "is_valid": true,
        "issued_at": 1347235328,
        "metadata": {
            "sso": "iphone-safari"
        },
        "scopes": [
            "email",
            "publish_actions"
        ],
        "user_id": "1207059"
    }
}
```

## twitter 分享

分享原理和 facebook 是一样的，通过爬虫获取分享信息

官网文档：https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/guides/web-intent

### 超链接分享

无需带上 appid 即可，注意，url 后面跟着 url 需要 encodeUrl，hashtags 传的是话题

```
https://twitter.com/intent/tweet?text=xxx&url=xxx&hashtags=xxx
```

![20200915231009](https://img-blog.csdnimg.cn/img_convert/005e12700fa17471a8c0add38bf3852f.png)

注意，在手机端会自动识别所有元数据，同 facebook 是通过爬虫抓到数据，所以也需要和 facebook 一样设置所有的 title，image 等数据

### twitter 分享调试工具

https://cards-dev.twitter.com/validator

![20200915231526](https://img-blog.csdnimg.cn/img_convert/ab6bdadf8297eea5a8a8343d805599b5.png)

注意，这里和 facebook 一样，可能有**网站更新了但是分享的内容没有及时更新的 bug**，此时用这个工具重新 preview 一下即可，可以手动触发爬虫

## whatsapp 分享

分享原理和 facebook 是一样的，通过爬虫获取分享信息

### 超链接分享

```
https://api.whatsapp.com/send?text=我要分享 https://www.luotuxiu.cn/
```

![20200915231214](https://img-blog.csdnimg.cn/img_convert/18f99b656452e61fcd794cc0e03922b8.png)

注意，在手机端会自动识别所有元数据，同 facebook 是通过爬虫抓到数据，所以也需要和 facebook 一样设置所有的 title，image 等数据

## 微信 H5 分享

分享原理是通过发送微信 jssdk api 获取分享信息

官方文档：https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html#3

### 1. 微信管理后台配置好 JS 接口安全域名

### 2. 引入 JS 文件http://res.wx.qq.com/open/js/jweixin-1.6.0.js

### 3. 调用 api 申请权限

```
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: '', // 必填，公众号的唯一标识
  timestamp: , // 必填，生成签名的时间戳
  nonceStr: '', // 必填，生成签名的随机串
  signature: '',// 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});
```

注意，这里，签名的生成，需要后端去调用微信的 api，然后前端需要访问后端一个接口来返回每次的签名

### 4. 微信开发者工具就可以看到成功的 JS 接口列表

### 5. 分享给朋友的 api

```
wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
  wx.updateAppMessageShareData({
    title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: '', // 分享图标
    success: function () {
      // 设置成功
    }
  })
});
```

更多精彩文章可以看[我的博客](https://www.luotuxiu.cn/)，如有错误，欢迎指正，共同进步
