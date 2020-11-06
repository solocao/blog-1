#!/usr/bin/env sh

# throw error
set -e

# build static
npm run build
cd .vuepress/dist

git init
git add -A
git commit -m 'deploy-to-github'

git push -f https://github.com/chenxiaoyao6228/chenxiaoyao6228.github.io.git master

cd -

rm -rf .vuepress/dist