---
layout: fexo
title: 使用Javascript实现hash table
date: 2019-10-02T23:40:45.000Z
tags: null
permalink: 2019-10-02-data-structure-hash-table
---
## 前言
哈希表作为一种高效的键值对数据储存结构!(`将近O(1)`), 在各大语言中都有它的身影, 如Python中的dict, Java中的HashMap, 以及Javascript中的Map, 那么哈希表究竟是如何做到如此高效的呢? 要了解一个东西的最好的办法当然是自己实现一遍啦

## 暴力实现
暴力的实现很简单,但是效率低下, 每次查找都需要从头开始遍历数组,最坏的情况下, 时间复杂度为`O(n)`
```js
class hashTable(){
  constructor(){
    this.keys = []
    this.values []
  }
  set(key, value){
    this.keys.push(key)
    this.values.push(value)
  }
  get(key) {
    for (let i = 0; i < keys.length; i++) {
      if (key === keys[i]) {
        return values[i]
      }
    }
    throw 'no such property'
  }
}
```
有没有什么办法可以解决这个问题呢? 

## Hash 函数
简单而言, 就是将key的值映射到某个数值索引上, 并且每次对于特定的输入, 输出总是一定的.如
```
var hashKey = hash('age') // 384
```
这样一来我们就可以通过一个数组来保存values的值就可以了, 完美, 撒花!
```js
set(key, value){
  let index = hash(key)
  this.values[i] = value 
}
get(key) {
  let index = has(key)
  return this.values[index]
}
```

那么, 怎么实现这个hash函数以保证每次都能够返回一样的index值呢? 一种方法是这样的,假设我们需要hash的字母S的长度是L, 我们使用字母的charCode乘以31^(L-1),
> index = s[0] · 31 ^ (L–1) + … + s[L – 3] · 31 ^ 2 + s[L – 2] · 31 ^ 1 + s[L – 1] · 31 ^ 0.

举个栗子 `s = 'call'`, 对应计算出来的index就是
> index = 99·31^3 + 97·31^2 + 108·3^11 + 108·31^0 = 3045982

似乎很完美, 但是, 存在几个问题: 

* 可以优化缓存
* 得出来的index的下标可能很长,超出了我们数组的范围,毕竟我们的数组不可能无限大
* 不同的key转化出来的index可能会产生冲突冲突

第一个问题好解决, 使用一个内部的变量保存上次取值的index就可以了
第二个问题也好解决, 使用计算出来的值对字符串的长度M进行取余数, `index % M`,就能够保证得出的index位于0

## 冲突处理
麻烦的是第三个问题,index索引的冲突问题,对于这个问题, 有两种经典的实现思路

### 拉链法(seperate chaining )

### 开放寻址(open adderessign, Linear probing)
哈希方法: 将键值映射到0, M-1上
插入元素: 如果索引为i的位置是空的, 将键值放到i上, 否则按照i+1, i+2的方式继续尝试
搜索元素: 搜索表的索引i, 如果该处的元素不匹配, 继续按照i+1, i+2的方式尝试

(ps: 数组的大小M必须大于键值对的个数N)



#### 参考资料:
[list of hash functions](https://en.wikipedia.org/wiki/List_of_hash_functions)
https://www.freecodecamp.org/news/how-to-implement-a-simple-hash-table-in-javascript-cb3b9c1f2997/
https://www.mattzeunert.com/2017/02/01/implementing-a-hash-table-in-javascript.html
