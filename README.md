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
> - __prependTo__: Add the `HTMLElement` as the first child of the provided `Node`.
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
> Takes a configuration [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) and builds a [`HTMLElement`]() using processor functions. Returned value is the new `HTMLElement` object. Method takes a configuration parameter:
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
>   'my-custom-attribute': 'foo'
> });
> ```
> Resulting DOM:
> ```html
> <div>
>   <div class="css-class-selector"></div>
> </div>
> <input type="password"/>
> <nav my-custom-attribute="foo"></nav>
> ```
> Method returns `HTMLElement`.
>
>  All properties are optional but the configuration `Object` itself is mandatory. Passing an emtpy configuration `Object` will create an empty DIV element without any attributes or listeners. Configuration `Object` can contain any properties, however the following properties will be handled by predefined processor functions:
> - __appendTo__: Value must be of type [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node). You can provide a `Node` object, to which your `HTMLElement` will be appended.
> ```javascript
> const div = Elements.build({});
> Elements.build({
>   tag: 'input',
>   appendTo: div
> });
> ```
> ```html
> <div>
>   <input/>
> </div>
> ```
> - __attributes__: Value must be of type `Object`. Defining properties on the configuration `Object` itself, which do not have a corresponding processor function, will set attributes on your `HTMLElement`. However, should you wish to set an attribute, the name of which also happens to match a processor function, you set it using _attributes_. You can also use it if you wish expliciticly communicate your intent to set an attribute for any other reason.
> ```javascript
> Elements.build({
>   id: 'my-id'
> });
> Elements.build({
>   attributes: {
>     id: 'my-id'
>   }
> });
> Elements.build({
>   children: [
>     { tag: 'p', text: 'Lorem ipsum...' }
>   ],
>   attributes: {
>     children: 'foo'
>   }
> });
> ```
> ```html
> <div id="my-id"></div>
> <div id="my-id"></div>
> <div children="foo">
>   <p>
>     Lorem ipsum...
>   </p>
> </div>
> ```
> - __children__: Value must be of type `Object[]`. Each `Object` within the [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) will be used as the configuration to build nested `HTMLElement` objects. You can nest elements as deeply as you like.
> ```javascript
> Elements.build({
>   tag: 'table',
>   children: [
>     {
>       tag: 'tr',
>       children: [
>         { tag: 'th', text: 'foo' }
>       ]
>     },
>     {
>       tag: 'tr',
>       children: [
>         { tag: 'td', text: 'bar' }
>       ]
>     }
>   ]
> });
> ```
> ```html
> <table>
>   <tr>
>     <th>foo</th>
>   </tr>
>   <tr>
>     <td>bar</td>
>   </tr>
> </table>
> ```
> - __class__: Value must be of type [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String). Adds CSS class selectors to the `HTMLElement`. You could also set _class_ in __attributes__, however that would not be quite the same. Setting _class_ as in __attributes__ will override existing CSS class selectors, whereas using __class__ will any provided values in additions to already existing selectors. The difference between then only matters in edge cases, and usually you will get the same results using either. You can add multiple CSS class selectors to __class__ by separating them by spaces.
> ```javascript
> Elements.build({ class: 'my-selector' });
> Elements.build({ class: 'my-selector another-selector' });
> Elements.build({
>   attributes: { class: 'my-selector' }
> });
> Elements.build({
>   attributes: { class: 'my-selector another-selector' }
> });
> ```
> ```html
> <div class="my-selector"></div>
> <div class="my-selector another-selector"></div>
> <div class="my-selector"></div>
> <div class="my-selector another-selector"></div>
> ```
> - __elements__: Value must be of type `Node[]`. This is another way add nested elements, however in this case the `Array` must contain pre-build document `Node` objects, rather than configuration objects. You can use this with objects that you retrieved by using methods like _document.getElementById()_. You might also want to use __elements__ instead of __children__ when you need to have a reference to child `Node` for later processing. You can to use both __elements__ and __children__ on the same element, however there are no guarantees about which will be appended first. That being said, most JavaScript engines will evaluate these in order that they are defined.
> ```javascript
> const div = document.getElementById('my-id'); // Can use with elements retrieved from the DOM
> const input = Elements.build({ tag: 'input' }); // Can use with pre-build elements
> Elements.build({ elements: [div, input] });
>
> // Keeping a reference to an element allows you to manipulate the element after construction.
> input.classList.add('focused');
>
> // Can use both elements and children but this is dangerous
> Elements.build({
>   children: [
>     { tag: 'a', href: '/action/path' }
>   ],
>   elements: [div, input]
> });
> ```
> ```html
> <div>
>   <div id="my-id"></div>
>   <input class="focused"/>
> </div>
>
> <div>
>   <a href="/action/path"></a>
>   <div id="my-id"></div>
>   <input class="focused"/>
> </div>
> ```
> - __listeners__: Value must be of type `Object`. The `Object` effectively maps each [`Event`](https://developer.mozilla.org/en-US/docs/Web/API/Event) type to its handler [`Function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function). A handler `Function` should app an `Event` parameter.
> ```javascript
> Elements.build({
>   listeners: {
>     click: event => {
>       // Handler your click event here
>     },
>     mouseover: event => {
>       // Handler your mouseover event here
>     }
>   }
> });
> ```
> - __prependTo__: Value must be of type `Node`. This `HTMLElement` will be added as the first child of the the provided `Node`.
> ```javascript
> const div = Elements.build({
>   children: [
>     { tag: 'a' }
>   ]
> });
> Elements.build({
>   tag: 'form',
>   prependTo: div
> });
> ```
> ```html
> <div>
>   <form></form>
>   <a></a>
> </div>
> ```
> - __set__: Value can be of type `Object`. Any properties in this `Object` will be assigned to your `HTMLElement` object. With standard HTML elements this will work similarly to setting an attribute. However, instead of using the native _Element.setAttribute()_ method, this uses the JavaScript [assignment operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators#Assignment) on the `HTMLElement` object. This will invoke JavaScript setter functions should any be defined. This is mainly useful when defining custom [web components](https://developer.mozilla.org/en-US/docs/Web/Web_Components).
> ```javascript
> class MyComponent extends HTMLElement {
>   
>   set color(value) {
>     // Define your custom setter logic. This functions can be invoked using "set" configuration.
>     console.log(value);
>   }
>   
> }
>
> customElements.define('my-component', MyComponent);
>
> Elements.build({
>   tag: 'my-component',
>   set: {
>     color: [255,255,255,1]
>   }
> });
>
> // outputs to console => [255,255,255,1]
> ```
> - __style__: Value must be of type `Object`. This is equivalent to inline CSS in HTML. `Object` maps CSS properties to values. Property names should appear as they in regular CSS files, not camelCased.
> ```javascript
> Elements.build({
>   style: {
>     width: '100px',
>     'background-color': 'rgba(0,0,0,0.3)'
>   }
> });
> ```
> ```html
> <div style="width: 100px; background-color: rgba(0,0,0,0.3)"></div>
> ```
> - __tag__: Value can be a [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) or a [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy) value. This controls what type of `HTMLElement` will be produced. Omitting this configuration will produce a DIV element. The value can also reference a custom web component.
> ```javascript
> Elements.build({ tag: 'ul' });
> Elements.build({});
> Elements.build({ tag: 'my-component' });
> ```
> ```html
> <ul></ul>
> <div></div>
> <my-component></my-component>
> ```
> - __text__: Value must be of type `String`. Creates [`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text) content and adds it to the `HTMLElement`.
> ```javascript
> Elements.build({ tag: 'button', text: 'Click me!' });
> ```
> ```html
> <button>Click me!</button>
> ```

#### `Elements.buildFragment()`
> This method produces and returns a [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment) object, which can contain mutliple [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) objects. The `DocumentFragment` can be appended to any other [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) object. It takes a single parameter:
> - `Object[]` _(required)_: Every [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) in this [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) must be a configuration object that will be used to construct `HTMLElement` object in the `DocumentFragment`.
>
> Method returns `DocumentFragment`.
> ```javascript
> const fragment = Elements.buildFragment([
>   { tag: 'h1' },
>   { tag: 'form' },
>   { tag: 'button' }
> ]);
>
> document.body.appendChild(fragment);
> ```
> ```html
> <body>
>   <h1></h1>
>   <form></form>
>   <button></button>
> </body>
> ```

#### `Element.removeAllChildren()`
> This method removes all nested [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/Node) objects from the provided `Node`. Use this method when you wish empty out an element. Method accepts a single parameter:
> - `Node` _(required)_: The document `Node` that will be emptied.
>
> Method returns [`undefined`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined).
> ```html
> <div id="my-id">
>   <table></table>
>   <ul>
>     <li></li>
>   </ul>
> </div>
> ```
> ```javascript
> const div = document.getElementById('my-id');
> Elements.removeAllChildren(div);
> ```
> ```html
> <div id="my-id"></div>
> ```

