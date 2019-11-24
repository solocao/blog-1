---
layout: fexo
title: '实现angluar手记[一]scope和digest'
date: 2019-07-13T23:24:14.000Z
tags:
  - angular
permalink: 2019-07-13-build-your-own-angular-1-scope
---
## Scope
angular1使用的是"脏检查"机制来实现数据的双向绑定, 第一章要实现的Scope充当着重要的角色, 主要
* controller和view之间的数据传递
* 应用间不同部分的数据传递
* 事件系统的广播与监听
* 监听数据的变化

## Scope与Digest
使用的是观察者模式, scope中保存一个$$watcher队列, $watch函数往该队列中推入watcher, $digest的时候遍历该列表, watchFn函数职责只有一个, 那就是返回监听的值, 根据比较条件执行相应的回调, 也就是listenerFn函数
```javascript
Scope.prototype.$watch = function (watchFn, listenerFn) {
    var watcher = {
        watchFn: watchFn,
        listenerFn: listenerFn,
        last: function(){}
    };
    this.$$watchers.push(watcher);
};
Scope.prototype.$digest = function () {
    var self = this;
    var newValue, oldValue;
    _.forEach(this.$$watchers, function (watcher) {h
        newValue = watcher.watchFn(self);
        oldValue = watcher.last;
        if (newValue !== oldValue) {
            watcher.last = newValue;
            watcher.listenerFn(newValue, oldValue, self);
        }
    });
};
```

 ### 使用空函数作为唯一值
 由于函数是复合数据类型,watcher的最初值使用一个空函数而不是一个普通的值, 更加可靠
```javascript
function initWatchVal() { }
```
### digest 与 digestOnce 
由于watch的回调中可能会修改scope中的值, 如果修改的值在监听的watchFn执行之后, 则新改变的值不会触发回调, 因此需要有一个机制, 当listenerFn中对scope中的值进行修改之后, 再次执行$digest过程, 书中使用的是**dirty标识符**来标志是否需要进行下一轮的digest
```javascript
Scope.prototype.$$digestOnce = function () {
    ....
    _.forEach(this.$$watchers, function (watcher) {
        ....
        if (newValue !== oldValue) {
            dirty = true;
        }
    });
    return dirty;
};

Scope.prototype.$digest = function () {
    var dirty;
    do {
        dirty = this.$$digestOnce();
    } while (dirty);
}
```
### 不稳定临界值处理
如果listenerFn中watcherA中的WatchFnA监听的A值在WatcherB中被改变, 而WatcherB中监测的值B在watcherA中被改变, 那么$digest过程会不断被执行, 因此要有一个最大的调用临界点, 一旦超过这个点, 就要抛出异常.
```javascript
Scope.prototype.$digest = function () {
    var ttl = 10;
    var dirty;
    do {
        dirty = this.$$digestOnce();
        if (dirty && !(ttl--)) {
            throw "10 digest iterations reached";
        }
    } while (dirty);
};

```

### 记录最后一个dirtyWatcher
当前的实现中无论dirtyWatcher在$$wathcers队列的哪个位置,每次digest的时候都要遍历所有的watcher, 举个极端的例子: 100个watcher, 只有第一个watcher是dirty的, 那么两轮循环就进行了200次, 实际上, 我们可以通过记录最后一个dirtyWatcher, 将次数变成101次
```javascript
function Scope() {
    this.$$lastDirtyWatch = null;
}
```
在$$digestOnce中
```javascript
 oldValue = watcher.last;
        if (newValue !== oldValue) {
            self.$$lastDirtyWatch = watcher;
        } else if (self.$$lastDirtyWatch === watcher) {
            return false
        }
```

## 监听数组或者对象内部的变化
当前的检查机制是使用===来进行比较的, 在面对复合数据类型如对象数组的时候, 并不能检测到数组或者对象内部的变化, 一种解决的办法是复制整个对象或者数组, 但是这样会带来内存的消耗, 因此angular提供了另外一套监听机制, collection watching(将在第三章实现)
```javascript
watcher.last = (watcher.valueEq ? _.cloneDeep(newValue) : newValue);
```

## \$eval与$apply
应用中有一些代码是不为angular感知的, 比如用户手动操作了dom修改了数据, 因此我们需要将新的变化纳入scope的检测, 这就是$eval和$apply的初衷. **\$eval接受一个函数并且以scope作为参数, 立即执行该函数**, 这使得我们可以在scope的上下文中对外部代码进行求值, \$apply执行$eval操作后, 主动触发$digest过程
```javascript
Scope.prototype.$eval = function (expr, arg) {
    return expr(this, arg);
};
Scope.prototype.$apply = function (expr) {
    try {
        return this.$eval(expr);
    } finally {
        this.$digest();
    }
};
```

##  \$evalAsync
**在相同的digest周期内延迟执行某些函数或者表达式**, 处理的方法也简单, 使用一个$$asyncQueue来执行我们需要异步执行的函数, 在每次digest前, 先处理该队列中的异步函数
```javascript
function Scope() {
    this.$$asyncQueue = [];
}

Scope.prototype.$digest = function () {
    ...
    do {
        while (this.$$asyncQueue.length) {
            var asyncTask = this.$$asyncQueue.shift();
            asyncTask.scope.$eval(asyncTask.expression);
        }
        ...
       // 处理watchFn中调用$evalAsync的情况, 无脏值, 但是异步队列中有函数 
    } while (dirty || this.$$asyncQueue.length);
};
```
## scopePhase
目前的方案存在一个问题, 就是异步队列中函数的执行依赖的是$digest的周期, 但是digest周期是由其他外在因素确定的(脏值), $evalAsynce本身并不会触发digest过程, **我们希望的是$evalAsync本身可以检测digest周期是否正在进行,如果没有的话主动触发一个**, 为了解决这个问题, 我们使用一个phase标志来标记当前的状态
```javascript
function Scope() {
    this.$$phase = null;
}
```
定义标记phase的两个函数
```javascript
Scope.prototype.$beginPhase = function (phase) {
    if (this.$$phase) {
        throw this.$$phase + " already in progress";
    }
    this.$$phase = phase;
};

Scope.prototype.$clearPhase = function () {
    this.$$phase = null;
};
```
在$digest和apply中分别使用这两个函数来标志phase
```javascript
Scope.prototype.$apply = function (expr) {
    try {
        this.$beginPhase('apply');
    } finally {
        this.$clearPhase();
    }
};
```
最后一步,在$evalAsync中检测周期
```javascript
Scope.prototype.$evalAsync = function (expr) {
    var self = this;
    if (!self.$$phase && !self.$$asyncQueue.length) {
        setTimeout(function () {
            if (self.$$asyncQueue.length) {
                self.$$digestOnce();
            }
        }, 0);
    }
    this.$$asyncQueue.push({ scope: this, expression: expr });
};
```

## \$applyAsync, $$postDigest
$evalAsync用来处理digest周期内部需要延期执行的函数, 对于在digest周期外需要执行的函数, 我们需要定义另外一个函数$applyAsync, 该函数既不立即执行传入的函数也不立即触发digest周期, 而是将两者都延期执行, 一个常见的场景是http请求, 当请求数很多而我们每次获得响应都执行一次digest周期的话势必带来性能问题,$applyAsync可以将短期内的连续变化并入一个digest周期.
* 延期执行, 使用setTimeout 0, 因为当setTimeout中的函数被执行的时候, 主程上的其他代码肯定已经被执行完了.
* 多个合并, 使用单例模式, 利用setTimeout返回的id作为$$applyAsyncId, 只有当id不存在的时候,才会安排一个新的timeout 
```
```
## Error handling
添加try...catch语句, 以确保当某一个watcher中出现问题的时候程序还能够正常运行

## destroy a watch
angular中, 每一个watch都返回一个特定的函数值, 该函数在触发的时候, 会销毁相应的watcher
```javascript
this.$watch = function() {
    ...
    return function () {
        var index = this.$$watchers.indexOf(wathcer);
        this.$$watchers.splice(index, 1);
    }
}
```
## \$watchGroup
我们希望可以批量监听一组数据,当这些数据中的某个发生变化的时候, 都会触发相同的回调, 最容易想到的是将watchFns数组进行遍历, 对每个watchFn进行监听
```javascript
Scope.prototype.$watchGroup = function (watchFns, listenerFn) {
    var self = this;
    _.forEach(watchFns, function (watchFn) {
        self.$watch(watchFn, listener);
    });
};
```
