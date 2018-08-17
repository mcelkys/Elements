(function(globalScope, domApiInterface, libraryName) {

    var processorFunctions = {

        attributes: function(element, attributes) {
            for (var attribute in attributes) {
                element.setAttribute(attribute, attributes[attribute]);
            }
        },

        listeners: function(element, listeners) {
            for (var event in listeners) {
                element.addEventListener(event, listeners[event]);
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
            for (var i = 0; i < children.length; i++) {
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
            var split = classes.split(' ');
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
        }

    };

    function build(config) {
        var element = domApiInterface.createElement(config.tag || 'div');
        for (var prop in config) {
            if (prop in processorFunctions)
                processorFunctions[prop](element, config[prop]);
            else {
                var descriptor = Object.getOwnPropertyDescriptor(element, prop);
                if (descriptor && 'set' in descriptor)
                    descriptor.set(config[prop]);
                else if (prop !== 'tag')
                    element.setAttribute(prop, config[prop]);
            }
        }
        return element;
    }

    function buildFragment(configs) {
        var fragment = domApiInterface.createDocumentFragment();
        for (var i = 0; i < configs.length; i++) {
            fragment.appendChild(build(configs[i]));
        }
        return fragment;
    }

    function removeAllChildren(element) {
        var children = element.childNodes;
        for (var i = children.length - 1; i >= 0; i--) {
            element.removeChild(children[i]);
        }
    }

    function defineProcessor(key, fn) {
        processorFunctions[key] = fn;
    }

    var lib = {};
    lib.build = build.bind(lib);
    lib.buildFragment = buildFragment.bind(lib);
    lib.removeAllChildren = removeAllChildren.bind(lib);
    lib.defineProcessor = defineProcessor.bind(lib);

    Object.defineProperty(globalScope, libraryName, {
        writable: false,
        configurable: false,
        enumerable: false,
        value: Object.freeze(lib)
    });

})(window, document, 'Elements');
