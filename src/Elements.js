/**
 *  Elements 1.4.0
 *  Copyright (c) 2018 Mindaugas Celkys
 *  Released under the MIT License.
 */

(function(globalScope, domApiInterface, libraryName) {

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

    var processorFunctions = {

        attributes: function(element, attributes) {
            for (var attribute in attributes) {
                element.setAttribute(attribute, attributes[attribute]);
            }
        },

        listeners: function(element, listeners) {
            for (var event in listeners) {
                element.addEventListener(event, listeners[event], EVENT_LISTENER_OPTIONS);
            }
        },

        children: function(element, children) {
            element.appendChild(buildFragment(children));
        },

        child: function(element, child) {
            element.appendChild(build(child));
        },

        text: function(element, text) {
            element.appendChild(domApiInterface.createTextNode(text));
        },

        style: function(element, styles) {
            for (var style in styles) {
                element.style.setProperty(style, styles[style]);
            }
        },

        nodes: function(element, children) {
            var fragment = domApiInterface.createDocumentFragment();
            for (var i = ZERO; i < children.length; i++) {
                fragment.appendChild(children[i]);
            }
            element.appendChild(fragment);
        },

        node: function(element, child) {
            element.appendChild(child);
        },

        appendTo: function(element, parent) {
            parent.appendChild(element);
        },

        class: function(element, classes) {
            var split = (typeof classes === STRING ? classes : String(classes)).split(SPACE);
            var classList = element.classList;
            classList.add.apply(classList, split);
        },

        set: function(element, properties) {
            for (var property in properties) {
                element[property] = properties[property];
            }
        },

        prependTo: function(element, parent) {
            var firstChild = parent.firstChild;
            if (firstChild) parent.insertBefore(element, firstChild);
            else parent.appendChild(element);
        },

        replaceNode: function(element, oldElement) {
            oldElement.parentNode.replaceChild(element, oldElement);
        },

        beforeNode: function(element, sibling) {
            sibling.parentNode.insertBefore(element, sibling);
        },

        afterNode: function(element, sibling) {
            var nextSibling = sibling.nextSibling;
            if (nextSibling) nextSibling.parentNode.insertBefore(element, nextSibling);
            else sibling.parentNode.appendChild(element);
        }

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
        for (var i = ZERO; i < configs.length; i++) {
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
