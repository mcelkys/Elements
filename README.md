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
  appendTo: document.body
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
> - __appendTo__: Append the `HTMLElement` that is being contructed to any [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) provided.
> - __attributes__: Sets `HTMLElement` attributes.
> - __children__: Appends `HTMLElement` with child elements built from configuration objects passed into __Elements.buildFragment()__ method.
> - __class__: Adds _class_ values to [`DOMTokenList`](https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList).
> - __elements__: Creates a [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) and appends it to the `HTMLElement` being constructed.
> - __listeners__: Add a listener [`function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) to the `HTMLElement`.
> - __set__: Assigns provided value (any type) to the `HTMLElement` object.
> - __style__: Set CSS properties to [`CSSStyleDeclaration`](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) of the `HTMLElement`.
> - __text__: Creates [`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text) content and appends it to the `HTMLElement`.
>
> If you wish to extend the functionality of this utility you can set additional processor functions to this `Map` and invoke them by setting properties with corresponding names to the configuration object:
> ```javascript
> // Define a new processor function
> Elements.PROCESSORS.set('isFocused', function(htmlElement, value) {
>   // Implement your custom functionality
>   if (value)
>     htmlElement.focus();
> });
>
> // Then elements you construct can be processed by your custom function
> const element = Elements.build({
>   isFocused: true
> });
> ```

### Static methods of `Elements`

#### `Elements.build()`
> Takes a configuration [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) and builds a [`HTMLElement`]() using processor functions. Method takes a configuration parameter:
> - Configuration `Object` _(required)_: If a property name is equal to processor function key, then said function will be invoked. If the configuration `Object` contains a property that does not match any processor functions, in that case the value will be set as an attribute on the `HTMLElement`:
> ```javascript
> Elements.build({
>   children: [
>     { class: 'css-class-selector' }
>   ]
> });
> Elements.build({
>   tag: 'input',
>   type: 'password'
> });
> Elements.build({
>   tag: 'nav',
>   'my-custom-attribute': 'lorem'
> });
> ```
> Resulting DOM:
> ```html
> <div>
>   <div class="css-class-selector"></div>
> </div>
> <input type="password"/>
> <nav my-custom-attribute="lorem"></nav>
> ```
>  All properties are optional but the configuration `Object` itself is mandatory. Passing an emtpy configuration `Object` will create an empty DIV element without any attributes or listeners. Configuration `Object` can contain any properties, however the following properties will be handled by predefined processor functions:
> - __appendTo__: Value must be of type [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node). You can provide a `Node` object, to which your `HTMLElement` will be appended.
