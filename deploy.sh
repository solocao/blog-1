#!/usr/bin/env sh

# throw error
set -e

# build static
npm run build
cd .vuepress/dist

# if you are deploying to a custom domain
 echo 'blog.chenxiaoyao.cn' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f https://${GITHUB_TOKEN}@github.com/chenxiaoyao6228/blog.git master

cd -

rm -rf .vuepress/dist