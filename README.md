# Testing Hooks [![CircleCI](https://circleci.com/gh/wwilsman/testing-hooks.svg?style=svg)](https://circleci.com/gh/wwilsman/testing-hooks)

Testing hooks perform the teardown step *before* the following setup step. When
singling out a specific test, this allows you to play with your test environment
and debug after the test runs.

## Quick Start

Install `testing-hooks`

``` bash
$ yarn add -D testing-hooks
```

### React

Unmounts the previous mounted component before mounting the next component.

``` javascript
import React from 'react';
import expect from 'expect';

// react-dom must be a dependency
import { mount } from 'testing-hooks/react-dom';

import MyComponent from '../my-component';

describe('MyComponent', () => {
  beforeEach(async () => {
    await mount(
      <MyComponent {...props} />
    );
  });

  it('mounts', () => {
    let $el = document.querySelector('.my-component');
    expect($el).toBeDefined();
  });
});
```

### Vue

Destroys the previous mounted component before mounting the next component.

``` javascript
import expect from 'expect';

// vue must be a dependency
import { mount } from 'testing-hooks/vue';

import MyComponent from '../my-component.vue';

describe('MyComponent', () => {
  beforeEach(async () => {
    await mount(MyComponent, { ...props });
  });

  it('mounts', () => {
    let $el = document.querySelector('.my-component');
    expect($el).toBeDefined();
  });
});
```

### Custom

Create your own testing hook using the core hook creator.

``` javascript
import { createTestingHook } from 'testing-hooks';

// the function passed to the creator performs setup and may be async
const myTestHook = createTestingHook((...args) => {
  console.log('called with args:', args);

  // return a function to teardown on the next hook call which can also by async
  return () => console.log('teardown', args);
});

// ...

// the returned hook is always async
await myTestHook('foo', 'bar');
//=> logs: "called with args:", ["foo", "bar"]

// teardown isn't called until the next hook call
await myTestHook('baz');
//=> logs: "teardown", ["foo", "bar"]
//=> logs: "called with args:", ["baz"]
```

## License

[MIT](https://github.com/wwilsman/interactor.js/blob/master/LICENSE)
