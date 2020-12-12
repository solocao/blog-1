// // const pipe = require('lodash/fp/flow');
// const pipe = (...fns) => x => fns.reduce((y, f)=> f(y), x)

// const g = (n) => n + 1;
// const f = (n) => n * 2;

// const trace = (label) => (value) => {
//     console.log(`${label}:${value}`);
//     return value
// };

// const doStuffBetter = pipe(g, trace('after g'), f, trace('after f'));
// doStuffBetter(20);

function green() {
    console.log('green');
  }
  
  function yellow() {
    console.log('yellow');
  }
  
  function red() {
    console.log('red');
  }
  
  function light(cb, time) {
    return setTimeout(cb, time)
  }
  
  function step() {
    Promise.resolve()
      .then(function () {
        // then中返回了promise的时候,相当于在两个then之间插入一个then
        return light(red, 3000);
      })
      .then(function () {
        return light(green, 1000);
      })
      .then(function () {
        return light(yellow, 2000);
      })
      .then(function () {
        // step();
      });
  }
  step();
