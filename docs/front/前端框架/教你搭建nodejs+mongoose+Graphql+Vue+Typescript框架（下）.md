# 教你搭建 nodejs+mongoose+Graphql+Vue+Typescript 框架（下）

## 前端: Vue + Typescript + Graphql + Jwt

[auto-page-web](https://github.com/LuoTuxiu/auto-page-web)

项目中使用 vue-typescript-admin-template 做二次改造，功能是 vue 可视化页面生成后台（前端前台）

## 后端： nodejs + mongoose + apollo + graphql + jwt

[
page-node](https://github.com/LuoTuxiu/page-node)

<!-- 关于后端的源码分析可以见[教你搭建nodejs+mongoose+Graphql+Vue+Typescript框架（上）]() -->

## 前端源码分析：

这里主要介绍整体框架及 apollo 的应用：

```
api // 主要封装一些api接口请求
layout // 填充页面主题结构，比如左侧导航栏和右边内容区域
views // 主要以页面维度来编写view
utils // 常见函数库
App.vue // 根Vue
main.ts // 框架入口
permission.ts // 通过路由劫持的原理去判断登录态
router.ts // 路由文件
```

### apollo 的应用

```
import Vue from 'vue'

import ElementUI from 'element-ui'

import App from '@/App.vue'
import store from '@/store'
import router from '@/router'
import '@/icons/components'
import '@/permission'

import VueApollo from 'vue-apollo'
import applloClient from './apollo'

Vue.use(VueApollo) // 注册一次插件

const apolloProvider = new VueApollo({
	defaultClient: applloClient
})

Vue.use(ElementUI)
Vue.use(SvgIcon, {
	tagName: 'svg-icon',
	defaultWidth: '1em',
	defaultHeight: '1em'
})

Vue.config.productionTip = false
new Vue({
	router,
	store,
	apolloProvider, // 在这里引入
	render: h => h(App)
}).$mount('#app')

```

.apollo 的源码如下：

```
import ApolloClient from 'apollo-boost'

const applloClient = new ApolloClient({
	uri: 'http://localhost:3001/graphql' // 这里很关键，要填写后端接口域名地址，如果后端在本地的3001端口则uri就是http://localhost:3001/graphq。技巧是可以把这个网址浏览器打开就是graphql的playground页面就对了
})

export default applloClient

```
