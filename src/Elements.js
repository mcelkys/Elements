class Elements {

    static build(config) {
        const element = document.createElement(config.tag || 'div');
        for (let prop in config) {
            if (this.PROCESSORS.has(prop))
                this.PROCESSORS.get(prop)(element, config[prop]);
            else if (prop !== 'tag')
                element.setAttribute(prop, config[prop]);
        }
        return element;
    }

    static buildFragment(configs) {
        const fragment = document.createDocumentFragment();
        for (let conf of configs) {
            fragment.appendChild(this.build(conf));
        }
        return fragment;
    }

    static removeAllChildren(element) {
        const children = element.childNodes;
        for (let i = children.length - 1; i >= 0; i--) {
            element.removeChild(children[i]);
        }
    }

}

Elements.PROCESSORS = new Map([
    ['attributes', function(element, attributes) {
        for (let attribute in attributes) {
            element.setAttribute(attribute, attributes[attribute]);
        }
    }],
    ['listeners', function(element, listeners) {
        for (let event in listeners) {
            element.addEventListener(event, listeners[event]);
        }
    }],
    ['children', function(element, children) {
        element.appendChild(Elements.buildFragment(children));
    }],
    ['text', function(element, text) {
        element.appendChild(document.createTextNode(text));
    }],
    ['style', function(element, styles) {
        for (let style in styles) {
            element.style.setProperty(style, styles[style]);
        }
    }],
    ['elements', function(element, children) {
        const fragment = document.createDocumentFragment();
        for (let child of children) {
            fragment.appendChild(child);
        }
        element.appendChild(fragment);
    }],
    ['appendTo', function(element, parent) {
        parent.appendChild(element);
    }],
    ['class', function(element, classes) {
        element.classList.add(...(classes.split(' ')));
    }],
    ['set', function(element, properties) {
        for (let property in properties) {
            element[property] = properties[property];
        }
    }],
    ['prependTo', function(element, parent) {
        const { firstChild } = parent;
        if (firstChild) parent.insertBefore(element, firstChild);
        else parent.appendChild(element);
    }]
]);
