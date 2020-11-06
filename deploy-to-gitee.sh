#!/usr/bin/env sh

# throw error
set -e

npm run build
cd .vuepress/dist

git init
git add -A
git commit -m 'deploy-to-gitee'

git push -f git@gitee.com:chenxiaoyao6228/chenxiaoyao6228.git master

cd -

rm -rf .vuepress/dist

# 需要手动刷新gitee的服务->Gitee Pages->更新