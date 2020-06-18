# react-数据的范式化 normalizr 应用

## 为什么需要 normalizr

1. 有时后端的接口（更多时候是已经不维护的旧接口）存在多层或者嵌套，前端需要转换数据
2. 前端需要分不同维度去取数据
3. redux 中 state 的结构有多层，而前端只想取其中一层
4. react 中的 PropsType

## 实例及解析过程

已经有一个成熟的范式化库[normalizr](https://github.com/paularmstrong/normalizr)

```
// originData
{
  "id": "123",
  "author": {
    "id": "1",
    "name": "Paul"
  },
  "title": "My awesome blog post",
  "comments": [
    {
      "id": "324",
      "commenter": {
        "id": "2",
        "name": "Nicole"
      }
    }
  ]
}
```

```
// 范式化过程，请按照步骤查看思路
import { normalize, schema } from 'normalizr';

// Define a users schema
// 步骤三，因为user是一个users schema实例，所以相当于该user对应着{"id": "1","name": "Paul"}，默认序列化取schema对应的值是取该id，所以转化后originalData中key是author，value是'1'。同时在上一步的entities给users添加一个{1: {"id": "1","name": "Paul"}}
const user = new schema.Entity('users');

// Define your comments schema
// 步骤四，由步骤三可得，需要将{"id": "324", "commenter": { "id": "2", "name": "Nicole"}}按照comment序列化
const comment = new schema.Entity('comments', {
  commenter: user
});

// Define your article
// 步骤二，schema实例的第一个参数，作为步骤一entities的一个key，对应的值是步骤一的originalData经过{author: user, comments: [comment]}序列化后的值
// 举个例子，originalData中key是author，value是{"id": "1","name": "Paul"}，所以该value值要按照user序列化，请看步骤三
// 同理，originalData中key是comments，value是[{"id": "324", "commenter": { "id": "2", "name": "Nicole"}}]，所以该value值要按照[comment]的格式化序列化，注意这里数据结构要一一对应起来，此时看步骤四
const article = new schema.Entity('articles', {
  author: user,
  comments: [comment]
});

// 步骤一：将原始数据originalData按照article的schema格式进行序列化，返回序列化后形如: {result: '', entities: {}}的格式的数据
const normalizedData = normalize(originalData, article);
```

```
// 范式化结果
{
  result: "123",
  entities: {
    "articles": {
      "123": {q
        id: "123",
        author: "1",
        title: "My awesome blog post",
        comments: [ "324" ]
      }
    },
    "users": {
      "1": { "id": "1", "name": "Paul" },
      "2": { "id": "2", "name": "Nicole" }
    },
    "comments": {
      "324": { id: "324", "commenter": "2" }
    }
  }
}
```

<!-- ## 源码分析

```
export const normalize = (input, schema) => {
  if (!input || typeof input !== 'object') {
    throw new Error(
      `Unexpected input given to normalize. Expected type to be "object", found "${
        input === null ? 'null' : typeof input
      }".`
    );
  }

  const entities = {};
  const addEntity = addEntities(entities);
  const visitedEntities = {};

  const result = visit(input, input, null, schema, addEntity, visitedEntities);
  return { entities, result };
};
``` -->
