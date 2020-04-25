#!/usr/bin/env node

// 接受题目名称字符串
let name = process.argv[2] ? process.argv[2] : '文章名'
let now = new Date()
let year = now.getFullYear()
let month = prependZero(now.getMonth() + 1)
let day = prependZero(now.getDay())
let dayString = year + '-' + month + '-' + day
let fileName = dayString + '-' + name + '.md'

// 自动生成文件
const fs = require('fs')
const path = require('path')

let absPath = path.resolve(__dirname, '../drafts/', fileName)

console.log(absPath)

let template = `
---
title: ${name}
tags:
  - javascript
date: ${dayString}
permalink:  ${dayString}-请设置英文名
---
`

fs.writeFileSync(absPath, template, { flag: 'wx' }, (err) => {
  if (err) throw err
  console.log('文件创建成功')
})

function prependZero(num) {
  return num < 10 ? '0' + num : num
}
