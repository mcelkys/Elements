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

### Get started

Download the _elements.min.js_ file and reference it from a __script__ in your HTML document.

```html
<script type="text/javascript" src=".../elements.min.js"></script>
```

### Examples

```javascript
const element = Elements.build({
  tag: 'p',
  id: 'paragraph-4',
  class: 'description',
  text: 'Lorem ipsum...',
  renderTo: document.body
 });
```
Equivalent code using native browser APIs:
```javascript
const element = document.createElement('p');
const textNode = document.createTextNode('Lorem ipsum...');
element.setAttribute('id', 'paragraph-4');
element.classList.add('description');
element.appendChild(textNode);
document.body.appendChild(element);
```
Resulting DOM:
```html
<body>
  <p id="paragraph-4" class="description">
    Lorem ipsum...
  </p>
</body>
```

## Reference

### Static properties of `Elements`

#### `Elements.PROCESSORS`
> A [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) that contains processors functions responsible for constructing [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) objects. Any function found in this `Map` can be invoked in __Elements.build()__ method. Adding a property to the element configuration object, passed as a parameter into __Elements.build()__, with name equal to `Map` key will cause the processor function to be invoked.
> Processor functions are anonymous functions that return [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) and accept 2 parameters:
> - `HTMLElement` object that is being constructed
> - The property value (any type), which is assigned to the corresponding property of the configuration object. 
>
> Utility comes with necessary predefined processor functions:
> - __attributes__: Sets `HTMLElement` attributes.
> - __children__: Appends `HTMLElement` with child elements built from configuration objects passed into __Elements.buildFragment()__ method.
> - __class__: Adds _class_ values to [`DOMTokenList`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList).
> - __elements__: Creates a [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) and appends it to the `HTMLElement` being constructed.
> - __listeners__: Add a listener [`function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) to the `HTMLElement`.
> - __renderTo__: Append the `HTMLElement` that is being contructed to any [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) provided.
> - __set__: Assigns provided value (any type) to the `HTMLElement` object.
> - __style__: Set CSS properties to [`CSSStyleDeclaration`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) of the `HTMLElement`.
> - __text__: Creates [`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text) content and appends it to the `HTMLElement`.
