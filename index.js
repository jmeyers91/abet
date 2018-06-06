const last = array => array[array.length - 1];

module.export = function abet(promise, steps=[], proxyTarget=()=>{}) {  
  async function processResult(result) {
    for(let step of steps) {
      result = await step(result);
    }
    return result;
  }
  
  return new Proxy(proxyTarget, {
    get(target, key) {
      if(key === 'then') {
        return (fn1, fn2) => promise.then(processResult).then(fn1, fn2);
      } else if(key === 'catch') {
        return fn => promise.then(processResult).catch(fn);
      }
      return abet(promise, [
        ...steps,
        result => result[key]
      ], proxyTarget);
    },
    
    apply(target, thisArg, args) {
      const getMethod = last(steps);
      const newSteps = steps.slice(0, -1);
      newSteps.push(result => getMethod(result).apply(result, args));
      return abet(promise, newSteps, proxyTarget);
    }
  });
}

