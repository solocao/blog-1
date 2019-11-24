---
layout: fexo
title: 'underscore源码学习笔记(四)collction相关方法'
date: 2019-06-28T16:26:44.000Z
tags: null
permalink: 2019-06-28-underscore-analysis-4-collection-related-method
---
#### 本节主要学习与collection相关的方法
##### 1. find和filter
```js
// Return the first value which passes a truth test. Aliased as `detect`.
_.find = _.detect = function(obj, predicate, context) {
  var keyFinder = isArrayLike(obj) ? _.findIndex : _.findKey;
  var key = keyFinder(obj, predicate, context);
  if (key !== void 0 && key !== -1) return obj[key];
};

// Returns the first index on an array-like that passes a predicate test.
_.findIndex = createPredicateIndexFinder(1);
_.findLastIndex = createPredicateIndexFinder(-1);

// Generator function to create the findIndex and findLastIndex functions.
var createPredicateIndexFinder = function(dir) {
  return function(array, predicate, context) {
    predicate = cb(predicate, context);
    var length = getLength(array);
    var index = dir > 0 ? 0 : length - 1;
    for (; index >= 0 && index < length; index += dir) {
      if (predicate(array[index], index, array)) return index;
    }
    return -1;
  };
};

  // Returns the first key on an object that passes a predicate test.
  _.findKey = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = _.keys(obj), key;
    for (var i = 0, length = keys.length; i < length; i++) {
      key = keys[i];
      if (predicate(obj[key], key, obj)) return key;
    }
  };

```
我们再次遇到了这种模式,当设计一个既可以从头也可以从尾部变量的抽象函数的时候,可以使用一个dir参数,初始值和for循环中的递进值(加或者减)

##### 2. filter: 利用each方法简化循环,将每次循环的参数用predicate进行判断,如果满足条件就push到返回的result数组中
```js
  _.filter = _.select = function(obj, predicate, context) {
    var results = [];
    predicate = cb(predicate, context);
    _.each(obj, function(value, index, list) {
      if (predicate(value, index, list)) results.push(value);
    });
    return results;
  };
```
##### 3._.findWhere(list, properties): 内部调用find方法,遍历所有的列表,返回列表中第一个包含properties的值
```js
  _.findWhere = function(obj, attrs) {
     return _.find(obj, _.matcher(attrs));
   };

  _.matcher = _.matches = function(attrs) {
    attrs = _.extendOwn({}, attrs); //由于是引用传值,这里不修改传入的参数
    return function(obj) {
      return _.isMatch(obj, attrs);
    };
  };
  _.extendOwn = _.assign = createAssigner(_.keys);
  
  var createAssigner = function(keysFunc, defaults) {
    return function(obj) {
      var length = arguments.length; //
      if (defaults) obj = Object(obj);
      if (length < 2 || obj == null) return obj;
      for (var index = 1; index < length; index++) {
        var source = arguments[index],
            keys = keysFunc(source),
            l = keys.length;
        for (var i = 0; i < l; i++) {
          var key = keys[i];
          if (!defaults || obj[key] === void 0) obj[key] = source[key];
        }
      }
      return obj;
    };
  };
```
除了学习一些基本的工具函数,一个浏览器的兼容性问题之外,最重要的问题某过于学习函数式编程的概,一方面是利用"拆分",识别抽象出公共的部分;,另一方面是是组合,将函数作为颗粒组合成我们需要的工具.这里的extend和extendOwn拥有相同的逻辑,因此抽象出createAssigner函数

##### 4._.reject(list, predicate, [context]) 
```js
// Return all the elements for which a truth test fails.
  _.reject = function(obj, predicate, context) {
    return _.filter(obj, _.negate(cb(predicate)), context);
  };
```
这里开始体现函数作为组合的好处了: 假设有这么一个数组[1,2,3,4],要从中挑选出奇数和偶数,你可以这样写
```
var list = [1,2,3,4];
_.filter(list, function(item) {return item % 2 == 0})
_filter(list, function(item) {return item % 2 != 0})
```
但是你也实现一个和filter相反的函数,将传入的predicate进行取反,我们来看看下面这段代码做了什么,这里的_.negate方法由于没有传递上下文,因此cb(predicate)返回的还是函数本身,negate做的也仅仅是一件事, 将predicate求值后的结果进行取反.
```
_.negate(cb(predicate))

_.negate = function(predicate) {
  return function() {
    return !predicate.apply(this, arguments);
  };
};
```

##### 5._.every(list, [predicate], [context])和 _.some(list, [predicate], [context]): 两者的区别就和他们的名字一样, every是全真才返回真, some是有真就返回.
```js
  _.every = _.all = function(obj, predicate, context) {
    predicate = cb(predicate, context); //callback处理
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (!predicate(obj[currentKey], currentKey, obj)) return false; //predicate判断
    }
    return true;
  };

  // Determine if at least one element in the object matches a truth test.
  // Aliased as `any`.
  _.some = _.any = function(obj, predicate, context) {
    predicate = cb(predicate, context);
    var keys = !isArrayLike(obj) && _.keys(obj),
        length = (keys || obj).length;
    for (var index = 0; index < length; index++) {
      var currentKey = keys ? keys[index] : index;
      if (predicate(obj[currentKey], currentKey, obj)) return true;
    }
    return false;
  };
```

##### 6_.contains(list, value, [fromIndex]): 判断数组中是否存在某个元素,内部使用的是二分查找的方式,因此如果明确知道传入的数组是已经排好序的话,可以传入一个guard为true的值,提高查找的效率
```js
  _.contains = _.includes = _.include = function(obj, item, fromIndex, guard) {
    if (!isArrayLike(obj)) obj = _.values(obj); //如果是数组的话,对所有的value值进行排序
    if (typeof fromIndex != 'number' || guard) fromIndex = 0;
    return _.indexOf(obj, item, fromIndex) >= 0;
  };

  _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
  //_.lastIndexOf = createIndexFinder(-1, _.findLastIndex);

  // Generator function to create the indexOf and lastIndexOf functions.
  var createIndexFinder = function(dir, predicateFind, sortedIndex) {
    return function(array, item, idx) {
      var i = 0, length = getLength(array);
      if (typeof idx == 'number') {
        if (dir > 0) { //indexOf
          i = idx >= 0 ? idx : Math.max(idx + length, i); //判断起始索引值与数组长度
        } else {
          length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
        }
      } else if (sortedIndex && idx && length) { //lastIndexOf
        idx = sortedIndex(array, item);
        return array[idx] === item ? idx : -1; //如果当前索引已经是要求的值,直接返回
      }
      if (item !== item) {
        idx = predicateFind(slice.call(array, i, length), _.isNaN);
        return idx >= 0 ? idx + i : -1;
      }
      for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
        if (array[idx] === item) return idx;
      }
      return -1;
    };
  };

  //createPredicateIndexFinder
```
##### 7.min_.min(list, [iteratee], [context]) 和 max_.max(list, [iteratee], [context]) 
```js
invoke_.invoke(list, methodName, *arguments) 


pluck_.pluck(list, propertyName) 

```
sortBy_.sortBy(list, iteratee, [context])和groupBy_.groupBy(list, iteratee, [context]) 

indexBy_.indexBy(list, iteratee, [context])和 _.countBy(list, iteratee, [context]) 
```
_.sample(list, [n]) 
```
size_.size(list): 用于判断数组长度或者对象的属性个数
```js
  _.size = function(obj) {
    if (obj == null) return 0;
    return isArrayLike(obj) ? obj.length : _.keys(obj).length;
  };
```

_.partition(list, predicate) : 根据传入predicate将list拆分为满足和不满足的部分
```js
  _.partition = group(function(result, value, pass) {
    result[pass ? 0 : 1].push(value);
  }, true);
```

本文最早发布于[CSDN](https://blog.csdn.net/zhuanyemanong/article/details/84788734)
