# Abet

Abet allows promises to be chained using the properties and methods of their results.

## Install

```
npm install abet
```

## Example

```
const promise = Promise.resolve({
  users: [
    {name: 'joe', age: 10},
    {name: 'sally', age: 20},
  ]
});

abet(promise)
  .users
  .reduce((a, b) => {
    if(a.age > b.age) return a;
    return b;
  })
  .name
  .then(name => console.log(name)); // prints 'sally'
  
```

Or using `async/await`:

```

const { name } = await abet(promise)
  .users
  .reduce((a, b) => {
    if(a.age > b.age) return a;
    return b;
  });
  
console.log(name); // prints 'sally'
```

## How it works

Abet relies on [ES6 Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) to keep track of keys being accessed and methods being called. When `then` or `catch` is called on a wrapped promise, the result is intercepted and reduced using the keys and methods used on the wrapper.

Take a look at the source. It's only 32 lines.
