# Stub-Everything
Never worry about Javascript and Typescript stubbing again. Stubs complex objects and classes all at once. [Uses SinonJS](http://sinonjs.org/) for stub objects

## Install

`npm install --save-dev stub-everything`

## API

```stubEverything(thingToMock: object|array|T): object|array|T```

```restoreEverything(thingToRestore: object|array|T): object|array|T```

### stubEverything

The default export. Will take an object/class/array and recursively stub every function in the prototype if a class, or the object properties if object literal.

### restoreEverything

Named export. Use to restore the stubs.

#### Example

```javascript

import stubEverything, { restoreEverything } from 'stub-everything';
import * as complexObject from './complexObject';
import functionUsesComplexObject from './functionUsesComplexObject';

beforeEach(() => {
  stubEverything(complexObject);
});

afterEach(() => {
  restoreEverything(complexObject);
});

it('should fire method on complexObject', function() {
  functionUsesComplexObject();
  
  expect(complexObject.someMethod.called).toEqual(true); //should be true
});

```
