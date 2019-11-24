---
layout: fexo
title: 'javascript设计模式-重新认识面向对象'
date: 2019-06-25T16:14:07.000Z
tags:
  - design-pattern
permalink: 2019-06-25-rethinking-object-oriented
---
## 从一道面试题讲起.
* 某停车场,分3层,每层100车位
* 每个车位都能够监控到车辆的驶入和离开
* 车辆进入前,显示每层的空余车位数量
* 车辆进入时,摄像头可识别车牌号和时间
* 车辆出来时, 出口显示器显示车牌号和停车时长

## 分析
第一点: 显然需要有Park,Floor,Place三个类
第二点: 每个车位(place)应有一个in和out方法监控车辆, 同时应该有一个状态.
第三点: 显示空余车辆的数量, 这个行为应该由停车场park来实现,并且是通过每个Floor的汇总
第四点: 摄像头Class输入的是一个车辆,记录则由Park进行记录,记录后要有地方进行存储,因此park中要有个carList属性进行记录.
第五点: 显然我们还需要添加一个显示器Screen类.需要显示车牌号和停车时长.因此需要获取车辆的车牌信息以及进入时间,再通过当前时间减去进入时间获得获得停车时长.

主要的车辆的in和out是由park进行汇总的,park的in方法里面可能有很多步骤(摄像头拍摄,显示器输出等)


可画出UML类图如下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190124013420816.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3podWFueWVtYW5vbmc=,size_16,color_FFFFFF,t_70)
最终可写出代码如下;
```js
//停车场
class Park {
    constructor(floorNum, perFloor) {
        this.floors = new Array(floorNum);
        for(let i = 0; i < this.floors.length; i++) {
            this.floors[i] = new Floor(perFloor);
        }
        this.camera = new Camera()
        this.screen = new Screen()
        this.carList = {}
    }
    in(car) {
        //摄像头记录
        let carMsg = this.camera.shot(car)
        //停到某个车位
        const i = parseInt(Math.random() * 100 / 100)
        const place = this.floors[0].places[i]
        place.in(i)
        carMsg.place = place
        //记录信息
        this.carList[car.num] = carMsg
    }
    out(car) {
        this.screen.showTime(this.carList[car.num])
        const place = this.carList[car.num].place
        place.out()
        delete this.carList[car.num]
    }
    emptyNum() {
        let num = 0;
        for(let i = 0; i < this.floors.length; i++) {
            let floor = this.floors[i];
            num += floor.emptyNum()
        }
        return num
    }
}
//层类
class Floor {
    constructor(num) {
        this.places = new Array(num);
        for(let i = 0; i < this.places.length; i++) {
            this.places[i]= new Place();
        }
    }
    emptyNum() {
        let num = 0;
        for(let i = 0; i < this.places.length; i++) {
            let place = this.places[i]
            if(place.empty) {
                num++
            }
        }
        return num
    }

}
//车位类
class Place {
    constructor() {
        this.empty = true
    }
    in() {
        this.empty = false
    }
    out() {
        this.empty = true
    }
}

//摄像头类
class Camera {
    constructor() {
        
    }
    shot(car) {
        return {
            num: car.num,
            inTime: Date.now()
        }
    }
}

//显示器类
class Screen {
    constructor() {

    }
    showTime(car) {
        let time = Date.now() - car.inTime
        console.log(`车辆${car.num}停车时长为${time}`)
    }

}

//车辆
class Car {
    constructor(num) {
        this.num = num;
    }
}

const park = new Park(3,100)

// 初始化车辆
const car1 = new Car('A1')
const car2 = new Car('A2')
const car3 = new Car('A3')

console.log('第一辆车进入')
console.log(park.emptyNum())
park.in(car1)
console.log('第二辆车进入')
console.log(park.emptyNum())
park.in(car2)
setTimeout(()=> {
    console.log('第一辆车离开')
    park.out(car1)
    console.log('第二辆车离开')
    park.out(car2)
    console.log('第三辆车进入')
    console.log(park.emptyNum())
    park.in(car3)
    console.log('第三辆车离开')
    park.out(car3)
},1000);
```
