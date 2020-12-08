---
title: 使用Javascript实现hash table
date: 2019-10-02T23:40:45.000Z
tags: null
permalink: 2019-10-02-data-structure-hash-table
---

## 前言

哈希表作为一种高效的键值对数据储存结构!(`将近O(1)`), 在各大语言中都有它的身影, 如 Python 中的 dict, Java 中的 HashMap, 以及 Javascript 中的 Map, 那么哈希表究竟是如何做到如此高效的呢? 要了解一个东西的最好的办法当然是自己实现一遍啦

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

简单而言, 就是将 key 的值映射到某个数值索引上, 并且每次对于特定的输入, 输出总是一定的.如

```
var hashKey = hash('age') // 384
```

这样一来我们就可以通过一个数组来保存 values 的值就可以了, 完美, 撒花!

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

那么, 怎么实现这个 hash 函数以保证每次都能够返回一样的 index 值呢? 一种方法是这样的,假设我们需要 hash 的字母 S 的长度是 L, 我们使用字母的 charCode 乘以 31^(L-1),

> index = s[0] · 31 ^ (L–1) + … + s[L – 3] · 31 ^ 2 + s[L – 2] · 31 ^ 1 + s[L – 1] · 31 ^ 0.

举个栗子 `s = 'call'`, 对应计算出来的 index 就是

> index = 99·31^3 + 97·31^2 + 108·3^11 + 108·31^0 = 3045982

似乎很完美, 但是, 存在几个问题:

- 可以优化缓存
- 得出来的 index 的下标可能很长,超出了我们数组的范围,毕竟我们的数组不可能无限大
- 不同的 key 转化出来的 index 可能会产生冲突冲突

第一个问题好解决, 使用一个内部的变量保存上次取值的 index 就可以了
第二个问题也好解决, 使用计算出来的值对字符串的长度 M 进行取余数, `index % M`,就能够保证得出的 index 位于 0

## 冲突处理

麻烦的是第三个问题,index 索引的冲突问题,对于这个问题, 有两种经典的实现思路

### 开放寻址(open adderessign, Linear probing)

哈希方法: 将键值映射到 0, M-1 上
插入元素: 如果索引为 i 的位置是空的, 将键值放到 i 上, 否则按照 i+1, i+2 的方式继续尝试
搜索元素: 搜索表的索引 i, 如果该处的元素不匹配, 继续按照 i+1, i+2 的方式尝试

(ps: 数组的大小 M 必须大于键值对的个数 N)

#### 参考资料

[list of hash functions](https://en.wikipedia.org/wiki/List_of_hash_functions)
<https://www.freecodecamp.org/news/how-to-implement-a-simple-hash-table-in-javascript-cb3b9c1f2997/>
<https://www.mattzeunert.com/2017/02/01/implementing-a-hash-table-in-javascript.html>
