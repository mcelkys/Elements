/**
 *  Elements 2.0.0-alpha
 *  Copyright (c) 2018 Mindaugas Celkys
 *  Released under the MIT License.
 */

(function(globalScope, domApi) {

    'use strict';

    var DIV = 'div';
    var TAG = 'tag';
    var FUNCTION = 'function';
    var EVENT_LISTENER_OPTIONS = (function() {
        var passiveSupported = false;
        try {
            domApi.createElement(DIV).addEventListener('click', function() {}, Object.defineProperty({}, 'passive', {
                get: function() {
                    passiveSupported = true;
                }
            }));
        } catch(e) {
            passiveSupported = false;
        }
        return passiveSupported ? { passive: true } : false;
    })();

    function processAttributes(element, attributes) {
        for (var attribute in attributes) {
            element.setAttribute(attribute, attributes[attribute]);
        }
    }

    function processListeners(element, listeners) {
        for (var event in listeners) {
            element.addEventListener(event, listeners[event], EVENT_LISTENER_OPTIONS);
        }
    }

    function processChildren(element, children) {
        var len = children.length;
        for (var i = 0; i < len; i++) {
            element.appendChild(create(children[i]));
        }
    }

    function processChild(element, child) {
        element.appendChild(create(child));
    }

    function processText(element, text) {
        element.textContent = text;
    }

    function processStyle(element, styles) {
        var elementStyle = element.style;
        for (var style in styles) {
            elementStyle.setProperty(style, styles[style]);
        }
    }

    function processNodes(element, children) {
        var len = children.length;
        for (var i = 0; i < len; i++) {
            element.appendChild(children[i]);
        }
    }

    function processNode(element, child) {
        element.appendChild(child);
    }

    function processAppending(element, parent) {
        parent.appendChild(element);
    }

    function processClass(element, className) {
        element.className = className;
    }

    function processId(element, id) {
        element.id = id;
    }

    function processSetters(element, properties) {
        for (var property in properties) {
            element[property] = properties[property];
        }
    }

    function processPrepending(element, parent) {
        var firstChild = parent.firstChild;
        if (firstChild) parent.insertBefore(element, firstChild);
        else parent.appendChild(element);
    }

    function processReplacingNode(element, oldElement) {
        oldElement.parentNode.replaceChild(element, oldElement);
    }

    function processInsertingBeforeNode(element, sibling) {
        sibling.parentNode.insertBefore(element, sibling);
    }

    function processInsertingAfterNode(element, sibling) {
        var nextSibling = sibling.nextSibling;
        if (nextSibling) nextSibling.parentNode.insertBefore(element, nextSibling);
        else sibling.parentNode.appendChild(element);
    }

    function processHTML(element, html) {
        element.innerHTML = html;
    }

    var processorFunctions = {
        afterNode: processInsertingAfterNode,
        appendTo: processAppending,
        attributes: processAttributes,
        atts: processAttributes,
        beforeNode: processInsertingBeforeNode,
        child: processChild,
        children: processChildren,
        class: processClass,
        html: processHTML,
        id: processId,
        listeners: processListeners,
        node: processNode,
        nodes: processNodes,
        on: processListeners,
        prependTo: processPrepending,
        replaceNode: processReplacingNode,
        set: processSetters,
        style: processStyle,
        text: processText
    };

    function create(config) {
        var element = domApi.createElement(TAG in config ? config.tag : DIV);
        for (var prop in config) {
            if (prop in processorFunctions)
                processorFunctions[prop](element, config[prop]);
            else {
                var descriptor = Object.getOwnPropertyDescriptor(element.constructor.prototype, prop);
                if (descriptor && typeof descriptor.set === FUNCTION)
                    descriptor.set.call(element, config[prop]);
                else if (prop !== TAG)
                    element.setAttribute(prop, config[prop]);
            }
        }
        return element;
    }

    function createFragment(configs) {
        var fragment = domApi.createDocumentFragment();
        var len = configs.length;
        for (var i = 0; i < len; i++) {
            fragment.appendChild(create(configs[i]));
        }
        return fragment;
    }

    function removeChildren(node) {
        var children = node.childNodes;
        var len = children.length;
        var removed = new Array(len);
        for (var i = len - 1; i >= 0; i--) {
            removed[i] = node.removeChild(children[i]);
        }
        return removed;
    }

    function defineProcessor(key, fn) {
        processorFunctions[key] = fn;
    }

    function fragmentFrom(nodes) {
        var fragment = domApi.createDocumentFragment();
        var len = nodes.length;
        for (var i = 0; i < len; i++) {
            fragment.appendChild(nodes[i]);
        }
        return fragment;
    }

    function declareInterface(name, publics) {
        Object.defineProperty(globalScope, name, {
            writable: false,
            configurable: false,
            enumerable: false,
            value: Object.freeze(publics)
        });
    }

    declareInterface('Elements', {
        create: create,
        defineProcessor: defineProcessor,
        removeChildren: removeChildren
    });

    declareInterface('Fragments', {
        create: createFragment,
        from: fragmentFrom
    });

})(window, document);
