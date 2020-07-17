# Node / Javascript internals

## Event Loop
The event loop is what allows Node.js to perform non-blocking I/O operations — despite the fact that JavaScript is single-threaded

##  V8
V8 is a engine created by Google, to be used in chrome, but it became open source.
O javascript é interpretado, but the v8 compiles the code and optimize the execution, allowing the execution to be done on top of the compiled code.

## Node.js and Threads
it can seem bad, but multi-thread languages needs a bigger cost of resources. Node was created to solve that problem.
But node being single-thread doesn't mean that it doesn't use thread internally.


### Non-blocking IO
Helps paralell execution and the use of resources.

Non-dependent actions should not be blocking. And this is what Node does using high-order functions, which gives the possibility to pass a function as a parameter. This allows non-blocking executions.

Example of a non-dependant blocking-code
```js

const content = fs.readFileSync('path'); // 1

console.log(content); // 2
console.log('executed'); // 3

```
Example of a non-dependant non-blocking-code
```js

fs.readFile('path', () => { // 1
  console.log(content); // 2
});

console.log('executed'); // 1

```

## Threads
Is something which is associated to a instance of each program we run, is a unit of operation that our cpu needs to perform.

---
## How async await works?

To understand async await we first need to understand about `generators`.

and to understand about `generators` we need to undertand `iterators`.

## Iterators

An iterator is an object that produces a sequence of values and return a value on it's end.

### What is defined as an iterator

A object to be defined as an iterator, needs to _implement_ a `next` method, which needs to return an object containing two properties:

**Done:** Defines if the sequence is finished or not

**Value:** Any value returned by the iterator

An iteretor object can be iterated by calling the next method

```js
{ done: false, value: 'test'  }
```

#### Example

A `String` is an iterable object. As we can see:

```js
const iterator = 'test'[Symbol.iterator]();
iterator.next(); // {value: "t", done: false}
iterator.next(); // {value: "e", done: false}
// ...
iterator.next(); // {value: undefined, done: true}
```

Also an `Array`:

```js
const iterator = [1, 2, 3][Symbol.iterator]();
iterator.next(); // {value: 1 done: false}
iterator.next(); // {value: 2, done: false}
// ...
iterator.next(); // {value: undefined, done: true}
```

### Creating an iterator

```js
function makeRangeIterator(start = 0, end = Infinity) {
  let nextIndex = start;
  let iterationCount = 0;

  const rangeIterator = {
    next: function () {
      let result;
      if (nextIndex < end) {
        result = { value: nextIndex, done: false };
        nextIndex++;
        iterationCount++;
        return result;
      }
      return { value: iterationCount, done: true };
    },
  };
  return rangeIterator;
}
```

## Generators

Generators are a type of function that can be executed paused and resumed at a controlled manner.

There are two main things that generators are used for, implementing lazy iterators and blocking asynchronous calls.

Heere is the same funcion above, but implemented using generators.

```js
function* makeRangeIterator(start = 0, end = Infinity) {
  let iterationCount = 0;

  for (let i = start; i < end; i++) {
    iterationCount++;
    yield i;
  }

  return iterationCount;
}
```

You can also inject a value in passing the value to the `next` function, like so, `next('new value')`.

## Async await

A way to pause the execution of code on the await keyword, when used on a promise, and resume only when the promise is resolved.

So we need 3 things to make something like this work.

- Pause a function
- Put a value inside the function
- Resume a function

And that's exacly what generators allowed us to do!

Let's see an example.

```js
const wrapToReturnPromise = function (gen) {
  const generator = gen();
  const { value } = generator.next();
  if (value.ispromise()) {
    return value
      .then((val) => generator.next(val))
      .catch((err) => generator.throw(err));
  }

  // Error
};
```

Here we created a function that receives a `generator function` from it's parameters, then we call the generator `next` method to get it's value, after that we check if that value is a promise and we call `next` again inside the `then`, but this time injecting the value to it (`generator.next(val)`), which would cause it to be returned as `{value: val, done}` object.


```js
const fakeApi = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve('fake data!');
    }, 1000);
  });
};

const foo = wrapToReturnPromise(function* () {
  try {
    const val = yield fakeApi();
    console.log(val); // fake data!
    return val;
  } catch (err) {
    console.log('Error: ', err.message);
  }
});
```
Okay, if everything is understood on your mind, here is the interesting part, we call the `wrapToReturnPromise`, passing in our generator function, which in this case just calls a function that returns a Promise and logs it, but we can see that it behaves exacly like an `async await` function, the `yield` will tell the runtime to stop there, just like the `await`, and after the promise is resolved, it resumes and logs the returned value!.