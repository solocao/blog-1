---

title: 原型链与继承（四）：理解instance of
date: 2019-06-23T17:07:04.000Z
tags: null
permalink: 2019-06-23-javascript-inheritance-4-instance-of
---

## 一、理解 instance of

> 基本语法：Left instanceof Right

在 javascript 中，判断数据主要依赖下面两种方式：

1、如果值应为一个引用类型，使用 instanceof 操作符检查其构造函数；

2、如果值应为一个基本类型，使用 typeof 检查其类型

看下内部实现机制：

```js
function instance_of(L, R) {
  //L 表示左表达式，R 表示右表达式
  var O = R.prototype; // 取 R 的显示原型
  L = L.__proto__; // 取 L 的隐式原型
  while (true) {
    if (L === null)
      //L是Object.prototype
      return false;
    if (O === L)
      // 这里重点：当 O 严格等于 L 时，返回 true
      return true;
    L = L.__proto__;
  }
}
```

原理：判断 L 内部隐藏的**proto**属性（如果 L.**proto**.**proto**不为空，则沿着原型链一直使用**proto**进行查找比较）是否和构造函数 R 的 prototype 相等。

这里注意有两个前提知识点：

1、只有函数有天然的 prototype 属性

2、所有对象都有隐藏的**proto**属性，在 js 中函数也是对象，因此函数也有**proto**

举个简单的例子：

```js
function Person(){  this.name = name;}
var p = new Person('allen')
 instanceof  //true
```

这里很好理解：
![](https://img-blog.csdn.net/20180515235400705)

由于 instanceof 实际上检测的是 L 通过 prototype 链条是否能**proto**是否等于 R.prototype，因此改变其中的一个会导致其结果发生变化

```js
function Person() {
  this.name = name;
}
Person.prototype.personSay = function() {
  console.log("I am a person");
};
var p = new Person("allen");
function Programmer(name, age) {
  this.name = name;
  this.age = age;
}
Programmer.prototype.programmerSay = function() {
  console.log("I am a programmer");
};
//改变一、改变p.constructor
p.constructor = Programmer;
p.__proto__ === Person.prototype; //true
p.__proto__ === Programmer.prototype; //false
p instanceof Programmer; //false
p instanceof Person; //true
//改变二、改变p.__proto__
p.__proto__ = Programmer.prototype;
p instanceof Programmer; //true
p instanceof Person; //false
//改变三、改变Person.prototype
Person.prototype = new Programmer();
p instanceof Person; //false
p instanceof Programmer; //false
p instanceof Object; //true
```

有了基本概念之后，看下以下几种情况：

情况 a

```
console.log(Number instanceof Number);//false
console.log(Number instanceof Function);//true
console.log(Function instanceof Object);//true
```

情况 b

```
console.log(Object instanceof Object);//true
console.log(Function instanceof Function);//true
```

之前说过，js 之中函数也是对象，因此在 instance of 左边使用 Number,String 或者自定义的函数也是可以的。

## 二、通过 instance of 理解 js 中的“一切皆对象”

![](https://img-blog.csdn.net/20180515235417902)

注意两点：

一、从对象的层面：所有对象（包括函数）使用 instance of 会查找到 Object.prototype 返回 true

二、从函数层面所有的函数都是由 Function 创建出来的（包括 Object），从构造器的层面而言，Function 是最顶级的。

用图来解释就是：所有函数的*proto*指向的都是 Function.prototype（包括 Function._proto_）,而 Function.prototype.*proto*指向的是 Object 的 prototype。

通过图来解释上面几种情况：

```js
Number instanceof Number; //（用图中的Foo函数代替）
Number.__proto__; // Function.prototype
Number.prototype; // Number.prototype,两者不等

Number instanceof Function;
Number.__proto__; // Function.prototype
Function.prototype; // Function.prototype,两者等

Function instanceof Object; //(函数也是对象)
Function.__proto__; //Function.prototype
Object.prototype; //Function.prototype

Object instanceof Object;
Object.__proto__.__proto__; //Object.prototype,这里向上查找了
Object.prototype; //Object.prototype

Function instanceof Function;
Function.__proto__; //Function.prototype
Function.prototype; // Function.prototype,两者等
```

三、理解原型链继承：

```js
function SuperType(){
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.Fun = function(){

};
function SubType(){
}
//继承了SuperType
SubType.prototype = new SuperType();
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green,black"
还是用图来解释：
![](https://img-blog.csdn.net/20180515235441784)
```

最后顺便谈一下 constructor 属性：constructor 属性不影响 JS 的内部属性，instance of 方法不需要用到它，基本而言，没什么用。但是从编程习惯上，在修改了构造函数的 prototype 之后，把 constructor 属性修正回来。

来自高程的例子：

```js
var Person = function() {};
Person.prototype = {
  name: "Nicholas",
  age: 29,
  job: "Software Engineer",
  sayName: function() {
    alert(this.name);
  }
};

var friend = new Person();

alert(friend instanceof Object); //true

alert(friend instanceof Person); //true

alert(friend.constructor == Person); //false

alert(friend.constructor == Object); //true
```

每次创建一个函数的时候，就会同时创建它的 prototype 对象，这个对象也会自动获得 constructor 属性。这里使用字面量的形式将 Person.prototype 指向一个新创建的对象字面量，因而其构造器变成 了 Object.但是为什么 friend.constructor 也变成了 Object 呢。貌似 friend 对象和 Person.prototype 是"同生共死"的关系，只要 friend.prototype 的 constructor 发生了变化，构建出来的 friend 的 constructor 也会跟着变化。

//重设构造函数，只适用于 ECMAScript 5 兼容的浏览器

```js
Object.defineProperty(Person.prototype, "constructor", {
  enumerable: false,
  value: Person
});
```
