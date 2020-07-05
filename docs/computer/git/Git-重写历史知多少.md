# Git-重写历史知多少(更改 commit 信息)

经常有以下这些需求：

1. commit 数量比较多，需要合并一些 commit 以保证提交记录清晰
2. commit 信息写错了

这里还分两种情形，一种是要重写本地仓库的 commit。第二种是已经 push commit 到远程仓库。

常见技巧：选择 push 到远程仓库要慎重，需要是你已经有充足的信心及把握提交代码（而且代码也是可信任的）。因为一旦提交到远程，别人从远程 clone 下来了，这时候你再要去重写历史，就需要别人**做一些额外的操作**才能保持同步。

举几个简单技巧的实例：

比如，我们现在有 3 个 commit，信息如下：

![20200704234158](http://qiniu.luotuxiu.cn/img/20200704234158.png)

## 当 commit 还在本地仓库时

### 只想重写上一个 commit 的信息时

```
git commit --amend -m 'feat: add 3 after change'
```

执行成功

![20200704234333](http://qiniu.luotuxiu.cn/img/20200704234333.png)

![20200704234345](http://qiniu.luotuxiu.cn/img/20200704234345.png)

请注意，**这时候 hash 值已经变化了**，commit hash 值由原 ae2a029 => fcfd33c

### 批量修改多个 commit 的信息或更改第几个 commit 时

举例：

![20200704230031](http://qiniu.luotuxiu.cn/img/20200704230031.png)

当前 master 分支，有 3 个 commit，按照从旧到新分别是 add 1、2、3

此时，如果你要修改 add 2 和 add 3 的 commit 信息，此时则取出要更改的**最早的 commit 的父 commit**

比如，执行

```
git rebase -i eb303949e839cbfc1e4ab531e3f33439789369d3
```

其中， eb303949e839cbfc1e4ab531e3f33439789369d3 是 commit: add 1 的 hash 值。

![20200704231232](http://qiniu.luotuxiu.cn/img/20200704231232.png)

出现文本编辑页面。注意，此时的 commit 的顺序，和正常看的 commit 信息是反的，因为是 rebase 操作，所以要从最早提交的子 commit 开始 rebase，所以这也是为什么反了的原因。

介绍下常见的名词解释：

> pick，使用该 commit 改动和 commit 信息

> reword 使用该 commit 改动，但是可以更改 commit 信息（同 git commit --amend -m 效果），**推荐使用这个更改多个 commit 信息**，因为比 edit 更少操作步骤

> edit， 使用该 commit 改动，但是可以更改 commit 信息（会在每次要更改 commit 前需要手动执行 git commit --amend）

> squash， 使用该 commit 改动，但是 commit 信息取前一个 commit 信息，也就是将该 commit 和前一个 commit 合并

#### 你想更改某个 commit 信息

##### 使用 edit

比如，你想将 commit： add 2 信息更改成：add 2 after change，那么可以在文本编辑状态时将 pick 更改成 edit，以下然后输入 :wq 保存

![20200704232115](http://qiniu.luotuxiu.cn/img/20200704232115.png)

此时会出提示

![20200704232202](http://qiniu.luotuxiu.cn/img/20200704232202.png)

这时 head 正处于 rebasing 状态，然后就和上面用 amend 使用是一样的，输入

```
git commit --amend
```

则会出现下面文本提示：

![20200704232353](http://qiniu.luotuxiu.cn/img/20200704232353.png)

此时，做出你想要做的 commit 修改，比如将 add 2 改成 add 2 after change 然后输入 :wq 保存，如下图

![20200704232458](http://qiniu.luotuxiu.cn/img/20200704232458.png)

此时看 git log 可以看到：

![20200704232540](http://qiniu.luotuxiu.cn/img/20200704232540.png)

当前 rebase 的 head 的 commit 信息已经被修改。由于还处于 rebasing 状态，所以我们需要执行：

```
git rebase --continue
```

此时提示：

![20200704232642](http://qiniu.luotuxiu.cn/img/20200704232642.png)

此时，查看 git 历史，已修改成功，hash 值也都相应更新了:

![20200704232734](http://qiniu.luotuxiu.cn/img/20200704232734.png)

##### 使用 reword（推荐）

![20200705085511](http://qiniu.luotuxiu.cn/img/20200705085511.png)

输入 :wq 保存后会立即进入编辑第一个 reword 的 commit 信息的文本编辑状态，即编辑：feat: add 2 的地方，此时进行文本编辑：feat: add 2 => feat: add 2 after reword

![20200705085640](http://qiniu.luotuxiu.cn/img/20200705085640.png)

编辑好 commit 信息后输入 :wq 保存，此时进入第二个 reword 的 commit 信息的文本编辑状态，此时进行文本编辑：feat: add 3 => feat: add 3 after reword

![20200705085734](http://qiniu.luotuxiu.cn/img/20200705085734.png)

编辑好 commit 信息后输入 wq 保存，即修改成功

![20200705085935](http://qiniu.luotuxiu.cn/img/20200705085935.png)

#### 你想合并某几个 commit 成一个 commit

要将最新的 commit 和最新的第二个 commit 信息合并，同理使用 rebase：

```
git rebase -i xxx // xxx 为父commit的hash
```

此时，将最新的 commit 改成：squash，如下图：

![20200705090249](http://qiniu.luotuxiu.cn/img/20200705090249.png)

按下 wq 进行保存，则进入 commit 信息编辑页面

![20200705090440](http://qiniu.luotuxiu.cn/img/20200705090440.png)

比如，将 commit 信息写成：feat: add 2 use reword and 3 use reword

![20200705090521](http://qiniu.luotuxiu.cn/img/20200705090521.png)

按下 wq 进行保存

![20200705090621](http://qiniu.luotuxiu.cn/img/20200705090621.png)

由此看到，commit 已经合并，而且 commit 信息也是 feat: add 2 use reword and 3 use reword

## 当 commit 已经 push 到远程

如果已经 push 到远程，则可以本地重写历史后，进行一次 push，此时该分支的 head 节点已经改变，**建议让协同者删除本地分支，拉去你刚刚 push 的分支**，再进行后续更改

更多精彩文章可以看[我的博客](https://www.luotuxiu.cn/)，如有错误，欢迎指正
