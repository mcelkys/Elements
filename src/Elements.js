/**
 *  Elements 1.3.2
 *  Copyright (c) 2018 Mindaugas Celkys
 *  Released under the MIT License.
 */

(function(globalScope, domApiInterface, libraryName) {

    'use strict';

    var ZERO = 0;
    var ONE = 1;
    var SPACE = ' ';
    var DIV = 'div';
    var TAG = 'tag';
    var FUNCTION = 'function';
    var STRING = 'string';
    var EVENT_LISTENER_OPTIONS = (function() {
        var passiveSupported = false;
        try {
            domApiInterface.createElement(DIV).addEventListener('click', function() {}, Object.defineProperty({}, 'passive', {
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
        for (var i = ZERO; i < len; i++) {
            element.appendChild(build(children[i]));
        }
    }

    function processChild(element, child) {
        element.appendChild(build(child));
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
        for (var i = ZERO; i < len; i++) {
            element.appendChild(children[i]);
        }
    }

    function processNode(element, child) {
        element.appendChild(child);
    }

    function processAppending(element, parent) {
        parent.appendChild(element);
    }

    function processClass(element, classes) {
        var split = (typeof classes === STRING ? classes : String(classes)).split(SPACE);
        var classList = element.classList;
        classList.add.apply(classList, split);
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

    var processorFunctions = {
        afterNode: processInsertingAfterNode,
        appendTo: processAppending,
        atts: processAttributes,
        attributes: processAttributes,
        beforeNode: processInsertingBeforeNode,
        child: processChild,
        children: processChildren,
        class: processClass,
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

    function build(config) {
        var element = domApiInterface.createElement(TAG in config ? config.tag : DIV);
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

    function buildFragment(configs) {
        var fragment = domApiInterface.createDocumentFragment();
        var len = configs.length;
        for (var i = ZERO; i < len; i++) {
            fragment.appendChild(build(configs[i]));
        }
        return fragment;
    }

    function removeAllChildren(element) {
        var children = element.childNodes;
        for (var i = children.length - ONE; i >= ZERO; i--) {
            element.removeChild(children[i]);
        }
    }

    function defineProcessor(key, fn) {
        processorFunctions[key] = fn;
    }

    Object.defineProperty(globalScope, libraryName, {
        writable: false,
        configurable: false,
        enumerable: false,
        value: Object.freeze({
            build: build,
            buildFragment: buildFragment,
            defineProcessor: defineProcessor,
            removeAllChildren: removeAllChildren
        })
    });

})(window, document, 'Elements');
