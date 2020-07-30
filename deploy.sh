#!/usr/bin/env sh

# throw error
set -e

# build static
npm run build
cd .vuepress/dist

# if you are deploying to a custom domain
#  echo 'chenxiaoyao.cn' > CNAME

git init
git add -A
git commit -m 'deploy-to-github'

git push -f https://github.com/chenxiaoyao6228/chenxiaoyao6228.github.io.git master


git init
git add -A
git commit -m 'deploy-to-gitee'

echo 'chenxiaoyao.cn' > CNAME
git push -f git@gitee.com:chenxiaoyao6228/chenxiaoyao6228.git master
# git push -f git@gitee.com:chenxiaoyao6228/chenxiaoyao6228.gitee.io.git master


cd -

rm -rf .vuepress/dist