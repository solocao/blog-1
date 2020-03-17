---
title: 工作中常用的git操作详解
tags:
  - git
date: 2020-03-15
permalink: 2019-05-28-git-rebase-how-to
---

## 前言

## 更改默认编辑器为 VSCode

对于不熟悉 vim 编辑器的朋友(比如我),最好的办法是将 git 默认的编辑器改为 VSCode(或者自己熟悉的编辑器).具体方法如下

- 打开 VSCode
- 打开控制面板(command[ctrl) + shift + p]，输入`shell command Install 'code' command in PATH command`, 成功后会出现`Shell command 'code' successfully installed in PATH.`提示
- 打开命令行， 输入 `git config --global core.editor "code --wait"`

## 记录同步：git fetch 与 git pull 的区别

一言以蔽之： `git pull` = `git Fetch` + `git Merge`

`git fetch` 把他人的分支更新拉取了过来，fetch 之后会产生 unstaged 的文件, 可以类比你本地进行了修改

`git pull` 在`git fetch`的基础上进行了`git merge`操作, 保留了其他人的 commit 信息的同事产生一个新的 commitID

频繁进行`git fetch`的好处：频繁的获取不会减少将来合并的复杂性，或者减少冲突的可能性，仅仅是让你知道原生分支 v 发生了什么

## 使用 git rebase 来修改提交记录

### 本地相同开发分支上进行 rebase: 合并提交信息

比如我们在 feature-x 进行开发，突然有一个紧急的 bug 需要修复，我们需要新开一个 hotfix-x 进行开发，此时我们有两个选择，一是使用 `git stash`, 二是使用 commit 进行提交，修复完成之后 checkout 回我们的 Feature 分支进行开发，开发完成后使用`git Rebase i`来合并 commit

```bash
git commit -m "Feat: feature-y 第一次提交"
git checkout master && git pull
git checkout -b feature-x

//处理完成hotfix-x

git checkout feature-x

// 处理feature-x其他功能

git rebase -i HEAD~2

```

i 表示 interactive, 以交互的形式打开界面，HEAD~2 表示最近的两次提交，会弹出下列输入框

```bash
pick cf22cb8 Feat: feature-y的第二次提交
pick a9eb8c3 Feat: feature-y的第一次提交

# Rebase a744522..d74653a onto a744522 (2 commands)
#
# Commands:
# p, pick <commit> = 选择本次commit
# r, reword <commit> = 选择该commit,但是需要重新编辑commit信息
# e, edit <commit> = 使用该commit，但是等待编辑
# s, squash <commit> = 使用该commit,但是与先前的commit进行合并
# f, fixup <commit> = 使用该commit,但是丢弃本次commit的log信息
# x, exec <command> = 使用shell执行剩余行的命令
# b, break = 在此停止，可以使用git rebase --continue 命名继续
# d, drop <commit> = 移除commit信息
# l, label <label> = 为当前的HEAD添加标签名
# t, reset <label> = 重新设置HEAD为某个标签
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# If you remove a line here THAT COMMIT WILL BE LOST.
#
# However, if you remove everything, the rebase will be aborted.
#
# Note that empty commits are commented out
```

Rebase 黄金法则: **不要在与他人合作的分支上进行操作**
包括以下几点：

- 不要 rebase master 分支
- 对于多人合作开发的 feature 分支，也不要进行 rebase,最好的方法是在此分支上开辟临时分支进行操作
- 避免在进行 Pull Request 之后的分支使用 rebase 操作

### git commit --amend

当发现 commit 信息写得有误(如单词拼错)的时候，可以使用该命令进行修改。

### git merge --squash

`squash`为**挤压，压缩之意**，执行该操作会产生一个新的 commit

```bash
git checkout master

git merge --squash feature-z

git commit -m "squash commit 信息"
```

`git commit`不使用`-m`修饰符会保留原来的 commit 信息
如图：

和`git rebase`的区别：

## git reset 进行回退

当对修改进行了 commit 之后，想要抛弃此 commit, 可以用`git reset --hard commitID`命名来回退到该 commitID 的状态记录，注意的是此时更改丢失，若想保留更改可以使用`git reset --soft commitID`, 修改的文件会变为 unstaged 状态。

## git stash

当需要切换分支，但是又不想进行提交的时候，比如和另外一个开发者在同一个 feature-x 上进行开发，不方便使用 rebase，此时可以用`git stash`将更改暂存起来。切换回来的时候再使用`git pop`将修改进行恢复。

参考：
https://github.com/geeeeeeeeek/git-recipes/wiki/5.1-%E4%BB%A3%E7%A0%81%E5%90%88%E5%B9%B6%EF%BC%9AMerge%E3%80%81Rebase-%E7%9A%84%E9%80%89%E6%8B%A9

https://gist.github.com/jedmao/5053440
