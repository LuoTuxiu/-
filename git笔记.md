# git笔记
###1.使用window系统的注意：
千万不要使用Windows自带的记事本编辑任何文本文件。原因是Microsoft开发记事本的团队使用了一个非常弱智的行为来保存UTF-8编码的文件，他们自作聪明地在每个文件开头添加了0xefbbbf（十六进制）的字符，你会遇到很多不可思议的问题，比如，网页第一行可能会显示一个“?”，明明正确的程序一编译就报语法错误，等等，都是由记事本的弱智行为带来的。

![](http://www.liaoxuefeng.com/files/attachments/001384907170801199e153159cc4a438bed8d255edf157a000/0)
###2.gitlab 命令：
(1)git clone 命令
```
git clone git@192.168.204.xx:.../xxx.git
```

###3.git常用命令
(1)新建文件夹，执行：
```
git init
```
会生成一个.git仓库
(2)查看当前分支
```
git branch
```
(3)查看本地状态
```
git status
```
(4)查看本地修改（未提交到暂存区，即未执行git add ）
```
git diff
```
(5)要新建并切换到该分支，运行 git checkout 并加上 -b 参数
```
git checkout -b 分支名
```
tips：新建并切换到远程的制定分支
```
git checkout -b remotes/origin/远程分支名
```
(6)放弃暂存区的修改，即只是add但是没有commit
```
git reset HEAD 文件
```
(7)放弃某个文件的更改(即未执行git add **取消对文件的修改,还原到最近的版本，废弃本地做的修改。**)
```
git checkout -- fileName
```
(8)拉取更新
```
git pull
```
(9)提交到本地仓库 指定文件
```
git commit -m 'xxx'
```
tips1:
**提交某个制定文件到本地仓库**
```
git commit src/index.vue -m '上传代码' 
```
tips2:注意参数不一样
```
git commit -am "xxx" === git add .  +  git commit -m ""
```
(10)提交本地提交到远程
```
git push -u origin 分支名
```
(11)git merge用于合并指定分支到当前分支
tips:
--no-ff 可以不以fast-forward的模式合并，这样就能够在图案上多出分支那条线
```
git merge --no-ff dev
```
(12)删除远程分支
```
git push origin --delete 远程分支名
```
