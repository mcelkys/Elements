# Elements

Utilities to ease DOM manipulations without using a framework with particular focus on rendering elements.


## Prerequisites

Utility is built to run on modern browsers that support:

  - Variable declarations using __`const`__ and __`let`__ keywords
  - ES6 Classes
  - Maps
  - Spread operator
  - Iterable objects and __`for...of`__ loops
  

## Usage

Download the _elements.min.js_ file reference it from a __script__ in your HTML document.

```html
<script type="text/javascript" src=".../elements.min.js"></script>
```


## Reference

### Static properties of `Elements`

#### `Elements.PROCESSORS`
> A [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) that contains processors functions responsible for constructing [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element) objects.
