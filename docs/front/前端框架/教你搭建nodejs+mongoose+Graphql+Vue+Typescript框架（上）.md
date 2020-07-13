# 教你搭建 nodejs+mongoose+Graphql+Vue+Typescript 框架（上）

## 前端: Vue + Typescript + Graphql + Jwt

[auto-page-web](https://github.com/LuoTuxiu/auto-page-web)

项目中使用 vue-typescript-admin-template 做二次改造，功能是 vue 可视化页面生成后台（前端前台）

## 后端：nodejs + mongoose + apollo + graphql + jwt

[
page-node](https://github.com/LuoTuxiu/page-node)

具体的后端架构如下：

```
koa: nodejs 开发平台
mongoose: 作为mongoodb数据库存储开发库，属于非关系型数据库
apollo: 提供一些配置
graphql： facebook出品的api请求框架
jwt：主要用于鉴权
```

## 源码解析：

### 后端：

#### nodejs 根控制器

我们的后端主要是提供接口，所以可以用 koa 跑起来一个服务，用来处理 api 接口请求。同时 koa 可以应用中间件完善很多功能，比如鉴权，api 接口封装诸如 graphql。

比如，先将 koa 跑起来：

```
import Koa from 'koa';
import koaBody from 'koa-body';

const app = new Koa();
app.use(koaBody());

app.listen(3000);
```

我们现在需要引入接口路由，这里我们用到的是 apollo-server-koa 这个开源库，这个库能帮助我们轻易搭建起来一个 graphql 接口服务。

先看最后的代码：

```
import Koa from 'koa';
import log4js from 'log4js';
import koaBody from 'koa-body';

import controller from './controllers';
import config from './config';

const app = new Koa();
app.use(koaBody());

// 初始化路由
controller.init(app);

app.listen(config.serverPort);
```

controllers 的代码如下：

```
import Router from 'koa-router';
import * as Koa from 'koa';
import initGraphQL from './graphql';

const router = new Router();

// 内部实现init
export default {
  init(app: Koa): void {
    app.use(router.routes()).use(router.allowedMethods());
    initGraphQL(app);
  }
};

```

apollo-server-koa 的实现放在 graphql.ts，代码如下：

```
import { ApolloServer, gql, ApolloError, UserInputError } from 'apollo-server-koa';
import * as Koa from 'koa';
import { makeExecutableSchema } from 'graphql-tools';
import userModel from '../models/userModel';


interface LoginParams { // 这里定义一些graphql的model
  name: string;
  passwd: string;
}

interface RigisterParams {
  name: string;
  passwd: string;
}

interface ApiData {
  code: number;
  data: string;
  msg: string;
}

function initGraphQL(app: Koa): void {
  const typeDefs = gql`
    type User {
      name: String
      passwd: String
      createdTime: Int
      roles: [String]
    }

    type UserParams {
      name: String
      passwd: String
      token: String
    }

    type ApiData {
      code: Int
      data: String
      msg: String
    }

    type Query { // 定义所有查询方法
      userInfo: User
      pageList(page: Int, limit: Int): [Page]
      pageDetail(_id: String): Page
    }

    type Mutation { // 定义所有更改方法
      login(name: String, passwd: String): UserParams
    }

    schema { // 最后组成schema
      query: Query
      mutation: Mutation
    }
  `;

  const resolvers = { // 定义对应处理函数
    Query: {
      userInfo: async (_parent: never, args: any): Promise<any> => {
        let result: boolean | user.Info[];
        result = userModel.query(args);
        return { ...result[0], roles: ['admin'] };
      },
    },
    Mutation: {
      login: async (_parent: never, args: LoginParams): Promise => {
        let query = {};
        if (args) {
          const { name, passwd } = args;
          query = {
            name,
            passwd
          };
        }
        const findUser: user.Info[] = await userModel.query(query);
        if(findUser.length === 0) {
          throw new ApolloError('user error')
          // return Promise.reject(new Error('user error'))
        }
        return { ...findUser[0], token: new Date().getTime() };
      },
    }
  };

  const myGraphQLSchema = makeExecutableSchema({
    typeDefs,
    resolvers
  }); // typeDef定义数据结构，resolvers定义query和mutation
  const server = new ApolloServer({ schema: myGraphQLSchema }); // 将schema当做ApolloServer的构造函数的实参
  server.applyMiddleware({ app }); // 在这一步将koa和apollo结合
}

export default initGraphQL;
```

<!-- ### 前端

篇幅过长，请见：[教你搭建 nodejs+mongoose+Graphql+Vue+Typescript 框架（下）](https://github.com/LuoTuxiu/auto-page-web) -->

<!-- ## 写在最后

前端开源项目地址：https://github.com/LuoTuxiu/auto-page-web

后端开源项目地址：https://github.com/LuoTuxiu/page-node -->
