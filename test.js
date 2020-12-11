// const pipe = require('lodash/fp/flow');
const pipe = (...fns) => x => fns.reduce((y, f)=> f(y), x)

const g = (n) => n + 1;
const f = (n) => n * 2;

const trace = (label) => (value) => {
    console.log(`${label}:${value}`);
    return value
};

const doStuffBetter = pipe(g, trace('after g'), f, trace('after f'));
doStuffBetter(20);

