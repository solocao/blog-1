---
title: 软件组合:Javascript函数式编程与对象组合的探索
tags:
  - javascript
date: 2020-12-12
permalink:  2020-12-12-composing-software-functional-and-object-composition
---


## 软件组合：简介

### 函数组合

```javascript
const g = n => n + 1
const f = n => n * 2

const doStuff = x => {
  const afterG = g(x)
  const afterF = f(afterG)
  return afterF
}

doStuff(20) // 42
```

每次你创建promise链条的时候，你就在组合函数

```javascript
const g = n => n + 1
const f = n => n * 2

const wait = time =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, time)
  })

wait(200)
  .then(() => 20)
  .then(g)
  .then(f)
  .then(value => console.log(value)) // 42
```

同样地，每次你串联数组方法调用，lodash方法，observables(如RxJS等), 你即是在组合。如果你将一个函数的返回值传递给另一个函数，你即是在组合。

通过对函数特意的组合，我们可以将上面的doStuff函数改写成一行的形式

```javascript
const g = n => n + 1
const f = n => n * 2

const doStuffBetter = x => f(g(x))

doStuffBetter(20) // 42
```

一种反对的声音是：这样的组合方式很难debug. 比如，如何用组合的形式改写下面的方法？

```javascript
const g = n => n + 1
const f = n => n * 2

const doStuff = x => {
  const afterG = g(x)
  console.log(`after g: ${afterG}`)
  const afterF = f(afterG)
  console.log(`after f: ${afterF}`)
  return afterF
}

doStuff(20)
// after g: 21
// after f: 42
```

首先，让我们把打印"after f", "after g"的过程抽象成一个工具函数trace()

```javascript
const trace = label => value => {
 console.log(`${lable}: ${value}`);
 return value
}
```

现在我们可以这样使用它

```
const trace = label => value => {
  console.log(`${label}:${value}`)
}
const doStuff = x => {
  const afterG = g(x)
  trace('after g')(afterG)
  const afterF = f(afterG)
  trace('after f')(afterF)
  return afterF
}

doStuff(20)
/*
"after g: 21"
"after f: 42"
*/
```

一些知名的函数式编程类库如Lodash和Ramda引入了一些工具函数以方便函数组合。

```javascript
// demo.js
// yarn global add ramda lodash
const pipe = require('lodash/fp/flow');

const g = (n) => n + 1;
const f = (n) => n * 2;

const trace = (label) => (value) => {
    console.log(`${label}:${value}`);
    return value
};

const doStuffBetter = pipe(g, trace('after g'), f, trace('after f'));
doStuffBetter(20);
```

你也可以无需引入任何库就实现上面的效果

```javascript
const pipe = (...fns) => x => fns.reduce((y, f)=> f(y), x)
```

### 对象组合
