# Abet

Abet allows promises to be chained using the properties and methods of their results.

## Example

```
const promise = Promise.resolve({
  users: [
    {name: 'joe', age: 10},
    {name: 'sally', age: 20},
  ]
});

const oldestUserName = await abet(promise).users.reduce((a, b) => {
  if(a.age > b.age) return a;
  return b;
}).name;
```

## Install

```
npm install abet
```
