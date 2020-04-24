---

title: javascript实现继承的多种方式
date: 2019-06-10T23:56:49.000Z
tags:
  - 代码
  - js
  - 继承
permalink: 2019-06-10-javascript-inheritance-1
---

## 一、原型链继承：

```js
function SuperType() {
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.Fun = function() {};
function SubType() {}
//继承了SuperType
SubType.prototype = new SuperType();
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green,black"
```

优点：能通过 instanceOf 和 isPrototypeOf 的检测

注意：给原型添加方法的语句一定要放在原型替换 SubType.prototype = new SuperType();之后

缺点:(1)SuperType 中的属性(不是方法)也变成了 SubType 的 prototype 中的公用属性，
      如上面例子中的 color 属性，可以同时被 instance1 和 instance2 修改
     (2)创建子类型的时候，不能像父类型的构造函数中传递参数。

## 二、借用构造函数

```js
function SuperType() {
  this.colors = ["red", "blue", "green"];
}
function SubType() {
  //继承了SuperType
  SuperType.call(this);
}
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green"

function SuperType(name) {
  this.name = name;
}
function SubType() {
  //继承了SuperType，同时还传递了参数
  SuperType.call(this, "Nicholas");
  //实例属性
  this.age = 29;
}
var instance = new SubType();
alert(instance.name); //"Nicholas";
alert(instance.age); //29
```

原理：在子类型构造函数的内部调用超类型构造函数
优点：解决了 superType 中的私有属性变公有的问题，可以传递参数
缺点：方法在函数中定义，无法得到复用

## 三、组合继承：

```js
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  alert(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name); //借用构造函数继承属性，二次调用
  this.age = age;
}
SubType.prototype = new SuperType(); //借用原型链继承方法，一次调用
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function() {
  alert(this.age);
};
var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29
var instance2 = new SubType("Greg", 27);
alert(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
```

优点：继承前两者的优点，能通过 instanceOf 和 isPrototypeOf 的检测
缺点：两次调用父构造器函数，浪费内存。

## 四、原型式继承：

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
```

使用场合：没必要构建构造函数，仅仅是想模拟一个对象的时候

## 五、寄生继承：

```js
function createAnother(original) {
  var clone = object(original); //通过调用函数创建一个新对象
  clone.sayHi = function() {
    //以某种方式来增强这个对象
    alert("hi");
  };
  return clone; //返回这个对象
}
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
```

缺点：方法在函数中定义，无法得到复用

## 六：寄生组合继承(最理想)：

```js
function inheritPrototype(subType, superType) {
  var prototype = object(superType.prototype); //创建对象
  prototype.constructor = subType; //增强对象
  subType.prototype = prototype; //指定对象
}
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function() {
  alert(this.name);
};
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}
inheritPrototype(SubType, SuperType); //实现继承
SubType.prototype.sayAge = function() {
  alert(this.age);
};
```

(本文完, 感谢阅读)
