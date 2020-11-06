---
title: '实现angular手记[二]scope继承'
date: 2019-07-13
tags:
  - angular
permalink: 2019-07-13-build-your-own-angular-2-scope-inheritance
---

## 前言

## 思考

发布订阅是如何同组件层级连接起来, scope 继承在 Vue 中是如何实现的呢? Vue 中的发布订阅是如何同 virtual-dom 联系起来的

### 利用原型链进行继承

使用

```js
let parentScope = new Scope();
let childScope = parentScope.$new();
```

实现

```js
$new() {
    let ChildScope = function() {}
    ChildScope.prototype = this
    let child = new ChildScope()
    child.$$watchers = []
    return child
  }
```

### 每个子组件拥有自己的 watchers 队列

每个 scope 只能控制自己以及 child, 不能控制其 parent 以及 parent 的其他子节点, 这样是比较符合直觉的, 当父组件发生了变化的时候, 子组件可能订阅了其中的属性.

每个 scope 拥有自己的`watchers`队列, 在`digest`时候就不会在原型链上向上查找了

为了对其子组件的`watchers`进行遍历, parentScope 需要知道其 childScope 的存在, 解决的方法是在每次`$new`的时候记录到`$$children`队列中

```js
  $new() {
    let ChildScope = function() {}
    ChildScope.prototype = this
    let child = new ChildScope()
    this.$$children.push(child)
    child.$$watchers = []
    child.$$children = []
    return child
  }
```

接下来要对`$digestOnce`进行修改, 增加对 childScope 的遍历, 只有当每个`childScope`都返回 false 的时候, 才算结束

```js
$$everyScope(fn) {
    if (fn(this)) {
      return this.$$children.every(function(child) {
        return child.$$everyScope(fn)
      })
    } else {
      return false
    }
  }
```

```js
  $$digestOnce() {
    let dirty
    let continueLoop = true
    this.$$everyScope(scope => {
      let newValue, oldValue
      utils.forEachRight(this.$$watchers, watcher => {
        try {
          if (watcher) {
            let newValue = watcher.watchFn(scope)
            let oldValue = watcher.oldValue
            if (!scope.$$areEqual(newValue, oldValue, watcher.valueEq)) {
              this.$$lastDirtyWatch = watcher
              watcher.oldValue = watcher.valueEq
                ? utils.deepClone(newValue)
                : newValue
              watcher.listenerFn(
                newValue,
                oldValue === this.$$initWatch ? newValue : oldValue,
                scope
              )
              dirty = true
            } else if (this.$$lastDirtyWatch === watcher) {
              continueLoop = false
              dirty = false
              return false
            }
          }
        } catch (e) {
          console.error(e)
        }
      })
      return continueLoop
    })
    return dirty
  }
```

树结构可以用链表来表示, 也可以用数组来表示

PS: AngularJS 内部并没有实现\$\$children 数组, 而是使用了链表的数据结构, `$$nextSibling, $$previousSibling, $$childHead, $$childTail`

PPS: React Fiber 内部不也是使用了这种链表的结构吗?

## 从根节点开始 digest

每个 childScope 都有一个`$root`属性来保存根节点, childScope 在调用`$apply`的时候直接委托根节点的`$digest`来触发自上而下的更新

```js
$apply(expression) {
    try {
      this.$beginPhase('$apply')
      expression.apply(null, [this])
    } finally {
      this.$clearPhase()
      this.$root.$digest() // 从根节点开始更新
    }
  }
```

evalAsync 也是如此

```js
 $evalAsync(expression) {
    if (!this.$$phase && !this.$$asyncQueue.length) {
      setTimeout(() => {
        if (this.$$asyncQueue.length) {
          this.$root.$digest() //
        }
      }, 0)
    }

    this.$$asyncQueue.push({
      scope: this,
      expression: expression
    })
  }
```

## isolated Scope

```js
if (isolated) {
  child = new Scope();
  child.$root = this.$root;
}
```

### 传入其他 scope 作为 parent

暂时想不到有什么使用场景

### destorying scope

需要保存一个`$parent`的引用, 通过 parent.\$\$children 来移除当前 scope

```js
 $destroy() {
    if (this.$parent) {
      let siblings = this.$parent.$$children
      let indexOfThis = siblings.indexOf(this)
      if (indexOfThis >= 0) {
        siblings.splice(indexOfThis, 1)
      }
      this.$$watchers = null
    }
  }

```
