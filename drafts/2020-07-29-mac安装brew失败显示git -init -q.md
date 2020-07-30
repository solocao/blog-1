---
title: mac安装brew失败显示git -init -q
tags:
  - javascript
date: 2020-07-29
permalink: 2020-07-29-mac-install-brew-git-init-q
---

## 问题

mac 想安装 nginx, 但是发现`brew`不存在

去`brew`的官网找到了相应的下载方法

```bash
 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/
```

执行脚本发现权限不足

```
mac@MacdeMBP-4 ~ % /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

Password:
==> This script will install:
/usr/local/bin/brew
/usr/local/share/doc/homebrew
/usr/local/share/man/man1/brew.1
/usr/local/share/zsh/site-functions/_brew
/usr/local/etc/bash_completion.d/brew
/usr/local/Homebrew

Press RETURN to continue or any other key to abort
==> Downloading and installing Homebrew...
/usr/local/homebrew/.git: Permission denied
Failed during: git init -q
```

## 方案

```bash
sudo chown -R $(用户名) /usr/local // 把${用户名}改为真实的用户名
```

切换到`usr/local`, 执行

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```

查看`brew`是否安装成功

```bash
brew -v
```
