# jest 使用技巧及避坑指南

## jest 是什么

jest 是 js 端的单元测试框架，特别是结合 enzyme 能够很方便地实现对 react 的组件测试，作为组件的单元测试也非常好用。

## jest 怎么用

### 1. 新增配置

可以直接在 package.json 增加 jest 属性，也可以添加默认 jest 的配置文件: jest.config.js，记住，这个配置文件需要 module.export 出一个对象

### 2. 关于 jest.config.js 的配置

详细的官方配置请见文档：https://jestjs.io/docs/en/configuration

#### moduleFileExtensions 指定要测试的文件类型的后缀

```
// jest.config.js
const {defaults} = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // ...
};
```

#### coverageThreshold 指定覆盖率目标

```
// branches 分支覆盖率
// functions 函数执行的覆盖率
// lines 代码函数覆盖率
// statements 声明的覆盖率
{
  ...
  "jest": {
    "coverageThreshold": {
      "global": {
        "branches": 80,
        "functions": 80,
        "lines": 80,
        "statements": -10
      }
    }
  }
}
```

global 指的是全局，你也可以指定特定文件夹具有不同的覆盖率。通常，函数类及组件类，都可以指定 100%的覆盖率

#### coveragePathIgnorePatterns 过滤无需统计的代码范围

```
Default: ["/node_modules/"]
```

默认，代码中引入的 node_modules 的部分的代码是不计入覆盖率统计范围的，所以如果我们某些文件夹被测试了，但是不想被统计入覆盖率或者也不应该被统计入覆盖率的话，可以在这个数组添加你想要的文件夹

#### setupFilesAfterEnv jest 执行前的钩子函数

比如，因为 jest 是在 node 端跑的，所以有一些兼容的代码我们可以写在这里，比如，location.href 在 node 端是会出错的，可以在这个钩子函数中执行一些兼容

先在 jest.setup.js 中写入钩子函数所在的路径

```
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
};
```

接着，在对应位置新建一个 jest.setup.js 文件

```
jest.setTimeout(10000)
```

那么所有的测试文件都会执行这个语句

## jest 使用技巧

### toMatchSnapshot 代码快照

这个对于组件单元测试很有用，特别是重构的时候可以对比，重构前后是否对组件的元素结构有所改变

配合 enzyme 的示例代码如下：

```
import React from 'react
import { shallow } from 'enzyme'
import CustomButton from './customButton

describe('test', () => {
	it('test render html', () => {
		const wrapper = shallow(<CustomButton />)
		expect(wrapper).toMathchSnapshot()
	})
})
```

执行该测试用例后，会在测试文件的当前文件夹创建一个快照文件夹。

如果后面代码更改的时候，jest 测试是会报错的
![20201018112506](http://qiniu.luotuxiu.cn/img/20201018112506.png)

如果是快照应该更新的时候，则可以执行

```
jest -u
```

这个命令会将新的快照更新到已有快照

## jest 源码分析

阅读 jest 源码时发现有用到一个--maxWorkers，实际上使用的是 throat 的库，这个库能够实现，控制同时执行的个数，比如，源码中，

```

```

## enzyme 源码分析

阅读 enzyme 源码时发现，有用到一个 Symbo 作为私有属性的功能，如果 Symbol 作为某个对象的属性的话，是无法使用 Object.keys,Object.getOwnPropertyNames 遍历到该属性的，进而可以实现私有属性

```
// 源码位置：packages/enzyme/src/ReactWrapper.js
const NODE = sym('__node__');
const NODES = sym('__nodes__');
const RENDERER = sym('__renderer__');
const UNRENDERED = sym('__unrendered__');
const ROOT = sym('__root__');
const OPTIONS = sym('__options__');
const ROOT_NODES = sym('__rootNodes__');
const WRAPPING_COMPONENT = sym('__wrappingComponent__');
const LINKED_ROOTS = sym('__linkedRoots__');
const UPDATED_BY = sym('__updatedBy__');

class ReactWrapper {
    constructor(nodes, root, passedOptions = {}) {
      privateSet(this, RENDERER, renderer);
      renderer.render(nodes, options.context);
      privateSet(this, ROOT, this);
      privateSetNodes(this, this[RENDERER].getNode());
      privateSet(this, OPTIONS, options);
      privateSet(this, LINKED_ROOTS, []);
    }
}
```

## istanbuljs 源码分析

istanbuljs 是 jest 内置用于产生测试报告的，其原理是通过代码插桩的方式进行统计代码植入，在 jest 跑测试任务时将原代码更换成插桩后的代码，跑完测试任务后就能够得到对应的数值。而代码插桩可以用过 babel 进行代码转换成 AST，进而实现改造
