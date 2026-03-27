const compose = (...fns) => {
  return (...args) => {
    return fns.reduceRight((pre, cur) => cur(pre), ...args)
  }
} 
const add10 = (x) => x + 10;
const mul10 = (x) => x * 10;
const add100 = (x) => x + 100; 
compose(add10, mul10, add100)(10)
