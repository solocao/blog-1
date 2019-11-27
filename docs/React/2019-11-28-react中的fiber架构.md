---
title: React中的fiber架构
date: 2019-11-28T02:23:22.000Z
tags: null
permalink: 2019-11-28-react-fiber
---
## 一.前言
React作为目前前端三大主流框架之一, 与Angular,Vue,Backbone为代表的**依赖收集+双向绑定**框架相比, 开创性地提出了许多新理念, 如单向数据流,vdom, fiber等, 使得大量的React爱好者对其进行深入研究, 加上Facebook的LICENCE事件, 大量的React-like轮子层出不穷,同时,React在面试中也成为高频考点. 

看完这篇文章, 你大概能回答下列问题:
* dom与react 16之前基于vdom比对的diff算法的问题
* React 16之后的fiber架构
* React setState为什么是异步的
* React hooks的基本原理,为什么不能写在条件语句中

学习的过程是从浅到深的过程, 了解下列前置知识有利于你更好地理解本文的内容
* 熟悉react主要api
* 对浏览器JS的解释执行,DOM等概念有所了解
* 理解基本数据结构和算法, 如递归,树和链表的基本使用

## 二. 旧的Diff算法
React 16之前的diff算法是基于vdom的比对的, 而要了解vdom, 就得从dom开始
### 浏览器的解析与DOM树的建立
浏览器在接收到服务端返回的数据后,会进行以下的步骤
* 解析HTML, 构建DOM树
* 解析CSS, 构建CSSOM树
* 构建render树, 剔除DOM树中如Header这类不需要渲染的东西
* reflow阶段: 计算元素在设备中的位置
* paint阶段: 调用系统的api进行图形绘制
### DOM为什么那么重
如果你尝试着打印一个DOM对象的所有属性的话, 你会发现还挺多的.....
![2019-11-28-05-41-33](http://blog.chenxiaoyao.cn/image/2019/10/2019-11-28-05-41-33.png)
事实上, Javascript中对象也是有区分的
* 最轻量: Object.create(null)
* 轻量: 一般的访问对象, {}, VDOM
* 重量, 如带getter/setter的Vue的vm对象
* 超重量: DOM对象

### 基于DOM树的对比
diff背后的基本知识
* 树的BFS(广度优先遍历)/DFS(深度优先遍历)，需要O(N)的时空复杂度
* 传统diff算法通过循环递归对节点进行依次对比效率低下，算法复杂度达到O(N^3)

React、Vue则是放弃了完全及最小，实现从O(N^3) => O(N)

主要有两种比对形式
1. 新的vdom和旧的vdom的对比
2. 新的vdom和dom树直接对比

但是无论是哪种比对, 都是通过递归调用，通过dom树级关系构成的栈递归。当动画过多, 或者出现大规模组件更新的时候就会出现卡顿的情况

![stack](http://s3.mogucdn.com/mlcdn/c45406/190406_5gkdlca7k824he218jca83109fb39_550x280.gif)
![fiber](http://s3.mogucdn.com/mlcdn/c45406/190406_379jij3e66jkag26b94860hbe9d3l_550x280.gif)

## 三.fiber架构
针对旧的diff算法存在的问题, React团队在React16这个大版本中重写了核心代码, 引入了fiber架构.其背后依据的点有两个：

* `Fiber`结构
* `window.requestIdleCallBack(callback)`

好处：
* 可拆分，可中断任务
* 可重用各分阶段任务，且可以设置优先级
* 可以在父子组件任务间前进后退切换任务
* render方法可以返回多元素（即可以返回数组）
* 支持异常边界处理异常


### Fiber

fiber对象可以说是vdom的升级版，一个最简单的fiber对象是这样的
```js
let fiber = {
  return: '上一级节点',(之前称为parent)
  child: '第一个子节点',
  sibling:, '兄弟节点'，
  dom: 'fiber对应的真实节点'
}
```
假设我们有这样的DOM结构
```html
<ul>
  <Button></Button>
  <li></li>
  <li></li>
  <li></li>
</ul>
```
对应的fiber结构是这样的
![2019-11-28-02-12-58](http://blog.chenxiaoyao.cn/image/2019/10/2019-11-28-02-12-58.png)

与之前的VDOM结构的区别在于： **树状的结构被拉成线性的链表结构了**，遍历diff的时候是    
> HostRoot -> ul -> button -> li -> li -> li -> ul -> HostRoot

这也就意味着, 我们可以用一个`全局的NexTUnitOfWork`指针在标记目前正在处理的节点， 即使发生了中断，我们再次回来的时候还能够根据`nextUnitOfWork`精确地找到之前处理的节点, 直到最后一个节点被处理完


### requestIdleCallBack(callback)
现在我们已经有fiber结构和标记当前下一个需要被处理节点的`nextUnitOfWork`变量了，下一步我们需要的一个函数,能够
> 1.在特定的时间处理我们的`nextUnitOfWork`节点
> 2. 将`nextUnitOfWork`指针向前移动到下一个节点

这就是接下来要提到的`window.requestIdleCallback`函数

简单来说, 类似setTimeOut函数，浏览器会在**空闲的时刻**调用传入的callback进行执行

实际上，对于不支持此Api的浏览器, 可以基于setTimeOut实现简单的兼容处理
```js
window.requestIdleCallback = window.requestIdleCallback || function(handler) {
  let startTime = Date.now();
 
  return setTimeout(function() {
    handler({
      didTimeout: false,
      timeRemaining: function() {
        return Math.max(0, 50.0 - (Date.now() - startTime));
      }
    });
  }, 1);
}
```
OK，现在你脑海里大概能够形成这样的一个**指针不断移动处理节点**的画面了

### react fiber架构的工作流程 

我们知道， react中视图更新有三种方式：
* render， 初次渲染 
* setState， 视图更新的主要方式
* forceUpdate， 钩子函数 

同时,react将diff阶段分为两个阶段
* 调和（reconcile）阶段， 主要是收集dom节点的变更， 在对应的fiber上打tag, 如增(PLACEMENT),删(DELETION),改(UPDATE)， 此阶段**可以中断**
* commit阶段，调用原生的api对收集到的变化进行dom的真实修改，**为保证UI变化的连续性，理论上不可中断，中断之后又得从第一个节点开始**


更新的过程涉及到下面几个全局变量与函数
1. 变量
```js
//  需要处理的下一个fiber对象, 浏览器空闲的时候会处理
//  performUnitOfWork之后移动到下一个节点
//  在setState之后被重置为wipRoot
let nextUnitOfWork = null;
let wipRoot = null; // workInProgress树, #root对应的节点
let currentRoot = null; // 只有在commit阶段才被赋值
let deletions = null; // 收集被删除的对象
```
2. 函数
* requestIdleCallback(workLoop)
* workLoop
* performUnitOfWork: 收集节点的变更情况
* commitRoot和commitWork： 调用原生的DOM api将变更打补丁到真实的DOM树

下面我们一起来看看这几个函数

#### workLoop

我们的页面引入的bundle.js之后会执行下面这个方法，开始启动我们的`无限轮询`的阶段

```js
// 将workLoop添加到requestIdleCallBack
requestIdleCallback(workLoop);
```
  workLoop内部在执行完之后，又递归地调用了requestIdleCallback进行, 总之， workLoop是一直在执行的。 
```js
// 工作循环, 使得更新的处理能够中断
// 只要浏览器有空闲时间, 就会回来处理下一个fiber
function workLoop(deadline) {
  let shouldYield = false;
  // 收集节点的变更情况的阶段
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1; // 浏览器返回的deadline对象
  }

  //收集完成， 进入commit阶段
  if (!nextUnitOfWork && wipRoot) {
    commitRoot(wipRoot.child);
  }
  requestIdleCallback(workLoop);
}
```
而节点的处理则是`nextUnitOfWork`不为null的情况，而我们的render函数或者setState做的事， 只需要把`nextUnitOfWork`设置为最顶层的节点就OK了
```js
export function render(element, container) {
    wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    // 关键点: 更新操作是通过与alternate对象的比对来完成的
    // currentRoot只有在effect收集结束, 进行commit阶段才会被赋值
    // reconciliation的两个阶段: effect(节点变更收集), commit(将effect更新到dom)
    // effect收集阶段利用requestIdleCallback, 可以中断
    // 每次commit阶段都会从fiberRoot节点开始, 不能中断, 中断之后需要从头开始
    alternate: currentRoot // alternate指向旧的workInProgress树
  };
  nextUnitOfWork = wipRoot;
}
const setState = action => {
  // 省略代码若干
  nextUnitOfWork = wipRoot; // 从root节点开始更新
};
```
**reconcile阶段**
下面来看看workLoop里面收集阶段的performUnitOfWork方法，该方法有两个作用
* 处理当前节点
* 返回下一个需要处理的节点，有子节点则返回子节点， 没有子节点则横向找sibling兄弟节点，如果也没有就向上返回，最终返回到root节点， 收集阶段完成
```js
// 从<App />节点开始
function performUnitOfWork(fiber) {
  // 1. 处理当前节点
  const isFunctionalComponent = fiber.type instanceof Function;
   // TODO class component支持
  if (isFunctionalComponent) {
    updateFunctionalComponent(fiber);
  } else {
    updateHostComponent(fiber); // 更新浏览器宿主,浏览器环境也就是原生dom
  }
  // 2. 返回下一个要处理的fiber对象
  // 如果有子元素, 返回第一个子元素
  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber;
  while (nextFiber) {
    //  无则检查sibling
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    // sibling也没有就返回parent, 寻找parent.sibling
    nextFiber = nextFiber.parent;
  }
}
```
对应的updateHostComponent和updateFunctionalComponent方法
```js
// 处理当前fiber, 对dom节点进行增, 删, 改
// 并返回下一个需要处理的fiber对象
function updateHostComponent(fiber) {
  // 初次渲染, dom节点还没有生成,根据fiber逐步生成dom树
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  // 遍历children, 为创建新的fiber对象, 建立fiberTree
  const elements = fiber.props.children;
  // 遍历children, 1.建立sibling关系, 2.打tag
  reconcileChildren(fiber, elements);
}
// 函数式组件的更新
function updateFunctionalComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = []; // 搜集该组件的变化,允许多次setState
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
```
reconcileChildren方法
```js
// 从dom树建立sibling关系只能通过parent.children的遍历来建立
function reconcileChildren(wipFiber, elements) {
  let index = 0;
  //存在则返回oldFiber的child, 也就是<App />对应的fiber
  let oldFiber = wipFiber.alternate && wipFiber.alternate.child;
  // 建立一个空的链表的节点,第一个child是它的next节点, 通过不断移动, 建立完整的链条
  let prevSibling = null;

  while (index < elements.length || oldFiber != null) {
    const element = elements[index];
    let newFiber = null;
    const sameType = oldFiber && element && element.type == oldFiber.type;

    // 更新节点
    if (sameType) {
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: "UPDATE"
      };
    }

    // 新增节点
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,
        parent: wipFiber,
        alternate: null,
        effectTag: "PLACEMENT"
      };
    }

    // 删除节点
    if (oldFiber && !sameType) {
      oldFiber.effectTag = "DELETION";
      deletions.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (index === 0) {
      wipFiber.child = newFiber; // 保存第一个child的索引
    } else {
      // 除了第一个子元素外, 其他的子元素通过sibling链接到整体中
      prevSibling.sibling = newFiber;
    }

    prevSibling = newFiber;
    index++;
  }
}
```

**commit（阶段）**
收集完成之后，要根据tag来将变更更新到dom上面

commitRoot方法: 这里需要注意的是`currentRoot = wipRoot`的赋值, 回去翻翻`render`函数会发现, wipRoot这个fiber根节点有一个`alternate`属性,**这是因为第一次渲染的时候还没有完整的fiber Tree(也称为workInProgress Tree),为了下次进行diff的时候进行对比,需要保留老的workInProgress Tree** 一开始currentRoot也是一个空指针, 直到我们所有的commit都更新完成之后, 才会被赋值, 本次更新的workInProgress Tree在下次更新的时候就成了老树.
```js
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child); // 从<App />节点开始更新
  currentRoot = wipRoot;
  wipRoot = null;
}
```
```js
// 通过递归的方式遍历整棵树
function commitDeletion(domParent, fiber) {
  if (fiber.dom) {
    domParent.removeChild(fiber.dom);
  } else {
    commitDeletion(domParent, fiber.child);
  }
}
```
通过commitWork(fiber),commitWork(fiber.firstChild),commitWork(fiber.sibling)三个方法的调用完成fiber树的遍历
```js
function commitWork(fiber) {
  if (!fiber) {
    return;
  }
  let domParentFiber = fiber.parent;
  // 函数组件没有dom, 需要不断向上查找找到有dom的父节点
  while (!domParentFiber.dom) {
    domParentFiber = domParentFiber.parent;
  }
  const domParent = domParentFiber.dom;

  if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag === "DELETION") {
    commitDeletion(domParent, fiber);
  } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate, fiber.props);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}
```


### setState与Hooks
正是fiber的存在使得Hook的实现成为可能, hooks只是一个保存更新情况的队列而已
* alternate(旧的workInProgress树)上保存了所有的hook, 根据索引来排, **这也就是hooks为什么不能在条件语句中使用的原因,只要某个条件语句变为true或者false导致跳过了,后面的更新就全乱套了**
* **setState并没有立即更新,而是将变化push到了hook队列里面**, 同时setState修改nextUnitOfWork,触发更新, 进入收集->commit阶段,
```js
let wipFiber = null;
let hookIndex = null;

// 每次使用useState, 索引递增,在hook队列中添加一个新的变化
export function useState(initial) {
  const oldHook =
    wipFiber.alternate &&
    wipFiber.alternate.hooks &&
    wipFiber.alternate.hooks[hookIndex];
  // 每个hooks对象都有一个queue, 保存多次setState,最后一次性update
  const hook = {
    state: oldHook ? oldHook.state : initial,
    queue: []
  };

  const actions = oldHook ? oldHook.queue : [];
  actions.forEach(action => {
    hook.state = action(hook.state);
  });

  const setState = action => {
    hook.queue.push(action); // 没有立即更新
    wipRoot = { // 重置根节点,建立新的workInProgress树
      dom: currentRoot.dom,
      props: currentRoot.props,
      alternate: currentRoot
    };

    nextUnitOfWork = wipRoot; // 从root节点开始更新
    deletions = [];
  };

  wipFiber.hooks.push(hook);
  hookIndex++;
  return [hook.state, setState];
}

```
```js
function updateFunctionalComponent(fiber) {
  wipFiber = fiber;
  hookIndex = 0;
  wipFiber.hooks = []; // 搜集该组件的变化,允许多次setState
  const children = [fiber.type(fiber.props)];
  reconcileChildren(fiber, children);
}
```

ps: 本人也是现学现卖,文章有讲得不明白或者错漏的地方, 欢迎批评指教😹

## 四.参考资料

[Background_Tasks_API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Tasks_API#Example)

[using-requestidlecallback](https://developers.google.com/web/updates/2015/08/using-requestidlecallback)

[didact](https://github.com/pomber/didact)

[Virtual DOM 背后的秘密（Diff 篇）](https://zhuanlan.zhihu.com/p/36500459)

[A Cartoon Intro to Fiber - React Conf 2017](https://www.youtube.com/watch?v=ZCuYPiUIONs)

