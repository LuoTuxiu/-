# Git 的常见命令

## 克隆仓库：

git clone

```
git clone git@192.168.204.xx:.../xxx.git
```

## 在当前文件夹初始化 一个 git 项目：

```
git init
```

用终端命令 ls -al 会看到生成了一个.git 文件夹

## 查看当前所处的分支

```
git branch
```

## 查看本地更改状态

```
git status
```

## 查看本地当前的修改（未提交到暂存区，即未执行 git add ）

```
git diff
```

## 切换到该分支

```
git checkout 分支名 //要新建分支的话用git checkout -b 分支名
```

Tip：新建并切换到远程的制定分支

```
git checkout -b remotes/origin/远程分支名
```

## 放弃暂存区的修改(即只是 add 但是没有 commit 的那些文件)，使更改回退到工作区，

```
git reset HEAD 文件名
```

(7)放弃某个文件的工作区更改(即未执行 git add **取消对文件的修改,还原到最近的版本，废弃本地做的修改。**)

```
git checkout -- fileName
```

## 拉取远程仓库更新

```
git pull
```

## 提交到本地仓库

```
git commit -m 'xxx'
```

Tip1:
**提交某个制定文件到本地仓库**

```
git commit src/index.vue -m '上传代码'
```

Tip2:注意参数不一样

```
git commit -am "xxx" // 相当于两步：git add .  +  git commit -m ""
```

## 提交本地当前仓库提交到远程

```
git push -u origin 分支名
```

## git merge 用于合并指定分支到当前分支

Tip:
默认是 fast-forward 模式。fast-forward 的含义就是，例如，master 分支拉出一条新分支，更改后，切回 master 做 merge，此时 master 没有其它更改的话，默认会将 master 的指针直接指向新分支的头结点。此时 master 和新分支的头结点指向同一节点。加上--no-ff 可以不以 fast-forward 的模式合并，这样就能够在图案上多出分支那条线

```
git merge --no-ff dev
```

## 删除远程分支

```
git push origin --delete 分支名
```

最后，还有一篇[Git-重写历史知多少](https://www.luotuxiu.cn/git/Git-重写历史知多少.html)，新鲜出炉。

更多精彩文章可以看[我的博客](https://www.luotuxiu.cn/)，如有错误，欢迎指正
