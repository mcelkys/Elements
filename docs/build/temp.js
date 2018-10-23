const Events = (function() {
    const target = new EventTarget;

    return {

        generate(type, detail) {
            return new CustomEvent(type, { detail });
        },

        dispatch(type, detail) {
            const event = this.generate(type, detail);
            this.propagate(event);
        },

        propagate(event) {
            setTimeout(target.dispatchEvent.bind(target, event), 0);
        },

        when(type, handler) {
            target.addEventListener(type, handler, {
                passive: true,
                capture: false
            });
        },

        once(type, handler) {
            target.addEventListener(type, handler, {
                passive: true,
                capture: false,
                once: true
            });
        },

        remove(type, handler) {
            target.removeEventListener(type, handler, false);
        }

    };
})();
const Templates = (function() {
    const renderers = new Map;
    const controllers = new Map;

    return {

        withoutKey(name, renderer) {
            InstanceManager.forUnbound(name);
            renderers.set(name, renderer);
        },

        withUniqueKey(name, renderer) {
            InstanceManager.forStrictlyBound(name);
            renderers.set(name, renderer);
        },

        withCommonKey(name, renderer) {
            InstanceManager.forLooselyBound(name);
            renderers.set(name, renderer);
        },

        render(template, config) {
            const manager = InstanceManager.get(template);
            const controller = controllers.get(template);
            const render = renderers.get(template);
            InstanceManager.scheduleGarbageCollection();
            return render(config, manager.register.bind(manager), controller);
        },

        controllerFor(template, ctor) {
            const manager = InstanceManager.get(template);
            const controller = ctor(manager);
            controllers.set(template, controller);
        }

    };
})();
const InstanceManager = (function() {
    const managers = new Map;
    const references = new Map;
    var gcid;

    function performGarbageCollection() {
        const body = document.body;
        for (let node of references.keys()) {
            if (!body.contains(node)) {
                references.get(node)();
                references.delete(node);
            }
        }
    }

    return {

        get: managers.get.bind(managers),

        forUnbound(template) {
            var instance;
            const manager = Object.freeze({

                register(rootNode, inst) {
                    instance = inst;
                    references.set(rootNode, manager.clean.bind(manager, inst));
                },

                get: () => instance,

                has: () => !!instance,

                all: () => [instance],

                clean(inst) {
                    if (instance === inst)
                        instance = null;
                }

            });
            managers.set(template, manager);
        },

        forStrictlyBound(template) {
            const instances = new Map;
            const manager = Object.freeze({

                register(rootNode, key, instance) {
                    let all = instances.set(key, instance);
                    references.set(rootNode, manager.clean.bind(manager, key, instance));
                },

                get: instances.get.bind(instances),

                has: instances.has.bind(instances),

                all: () => Array.from(instances.values()),

                clean(key, instance) {
                    const existing = instances.get(key);
                    if (existing === instance)
                        instances.delete(key);
                }

            });
            managers.set(template, manager);
        },

        forLooselyBound(template) {
            const instances = new Map;
            const manager = Object.freeze({

                register(rootNode, key, instance) {
                    let all = instances.get(key);
                    if (!all) {
                        all = [];
                        instances.set(key, all);
                    }
                    all.push(instance);
                    references.set(rootNode, manager.clean.bind(manager, key, instance));
                },

                get: instances.get.bind(instances),

                has: instances.has.bind(instances),

                all: () => Array.from(instances.values()).reduce((all, some) => all.concat(some), []),

                clean(key, instance) {
                    const all = instances.get(key);
                    if (all) {
                        const index = all.indexOf(instance);
                        if (index >= 0) all.splice(index, 1);
                        if (all.length === 0) instances.delete(key);
                    }
                }

            });
            managers.set(template, manager);
        },

        scheduleGarbageCollection() {
            clearTimeout(gcid);
            gcid = setTimeout(performGarbageCollection, 3000);
        }

    };
})();
const Routes = (function() {

    var state = parse();

    function parse() {
        try {
            return JSON.parse(atob(location.hash[0] === '#' ? location.hash.slice(1) :  location.hash));
        } catch(e) {
            return null;
        }
    }

    function encode() {
        return '#' + btoa(JSON.stringify(state));
    }

    if (!state) {
        state = { template: 'home' };
        location.hash = encode();
    }

    window.addEventListener('hashchange', function() {
        var encoded = encode();
        if (encoded !== location.hash) {
            var parsed = parse();
            if (parsed) Events.dispatch('routing', parsed);
        }
    }, { passive: true });

    Events.when('routing', event => {
        state = event.detail;
        var encoded = encode();
        if (encoded !== location.hash)
            location.hash = encoded;
    });

    return {

        get: () => state

    };
})();
const Articles = (function() {

    var hierarchy = [];
    const byKey = new Map;
    const byTitle = new Map;
    var macros = {};
    var deferRetrievalBy = 0;

    function processDeclaration(articles, parentKey) {
        articles.forEach((article, index) => {
            const key = Uint32Array.of(...parentKey, index);
            article.key = key.join(':');
            article.retrieved = false;
            byKey.set(article.key, article);
            byTitle.set(article.title, article);
            if (article.src) {
                deferRetrievalBy += 2000;
                setTimeout(retrieve.bind(this, article), deferRetrievalBy);
            }
            if (article.children instanceof Array)
                processDeclaration(article.children, key);
        });
    }

    function compileRegex(query) {
        try {
            return new RegExp(query, 'gi');
        } catch(e) {
            return new RegExp;
        }
    }

    function retrieve(article) {
        if (article && !article.retrieved && typeof article.src === 'string') {
            Elements.build({
                tag: 'script',
                atts: { type: 'application/javascript', src: article.src },
                set: { async: true, defer: true },
                appendTo: document.head
            });
        }
    }

    return {

        macros(all) {
            Object.assign(macros, all);
        },

        declare(articles) {
            hierarchy = articles;
            processDeclaration(articles, new Uint32Array);
        },

        define(title, ctr) {
            const article = byTitle.get(title);
            if (article) {
                article.retrieved = true;
                article.render = ctr(Object.assign({}, macros));
                Events.dispatch('article-updated', article.key);
            }
        },

        all() {
            return hierarchy;
        },

        get(key) {
            const article = byKey.get(key);
            retrieve(article);
            return article;
        },

        search(query) {
            const regex = compileRegex(query);
            return Array.from(byTitle.values()).filter(article => regex.test(article.title));
        }

    };

})();
Templates.withoutKey('layout', (config, register, controller) => {
    const fragment = document.createDocumentFragment();
    const toolbar = Templates.render('toolbar');
    fragment.appendChild(toolbar);
    const content = Elements.build({
        id: 'content-wrapper',
        nodes: [
            Templates.render('sidebar'),
            Templates.render('main')
        ],
        appendTo: fragment
    });
    const overlay = Elements.build({
        id: 'overlay',
        class: 'invisible hidden',
        on: { click: controller.onOverlayClick.bind(controller) },
        appendTo: fragment
    });
    register(content, { overlay });
    return fragment;
});
Templates.withoutKey('toolbar', (config, register, controller) => {
    const searchInput = Elements.build({
        tag: 'input',
        atts: { type: 'text', placeholder: 'Search...' },
        on: {
            focus: controller.onSearchInputFocus.bind(controller),
            blur: controller.onSearchInputBlur.bind(controller),
            keyup: controller.onSearchInputKeyUp.bind(controller)
        }
    });
    const search = Elements.build({
        id: 'search',
        nodes: [ Elements.build({ class: 'icon' }), searchInput ]
    });
    const node = Elements.build({
        tag: 'nav',
        id: 'toolbar',
        children: [
            {
                tag: 'button',
                class: 'icon',
                on: { click: controller.onMenuButtonClick.bind(controller) }
            },
            {
                tag: 'h1',
                on: { click: controller.onTitleClick.bind(controller) },
                children: [
                    { tag: 'span', text: 'Elements' },
                    { tag: 'span', id: 'version', text: '2.0.0' }
                ]
            },
            { id: 'search-wrapper', node: search },
            {
                id: 'external-links',
                children: [
                    {
                        tag: 'a',
                        class: 'icon',
                        id: 'github-button',
                        href: 'https://github.com/mcelkys/Elements'
                    }
                ]
            }
        ]
    });
    register(node, { search, searchInput });
    return node;
});
Templates.withoutKey('sidebar', (config, register, controller) => {
    const menu = Elements.build({ tag: 'ul' });
    const node = Elements.build({ tag: 'aside', node: menu });
    register(node, { menu, node });
    controller.onRender();
    return node;
});
Templates.withUniqueKey('menu-item', ({ data, state }, register, controller) => {
    const node = Elements.build({
        tag: 'li',
        atts: {
            class: (state.template === 'article') ? `${state.params.key.startsWith(data.key) ? 'open' : ''} ${state.params.key === data.key ? 'active' : ''}` : ''
        },
        children: ([{
            tag: 'button',
            text: data.title,
            on: { click: controller.onButtonClick.bind(controller, data.key) }
        }]).concat(data.children instanceof Array ? [{
            tag: 'ul',
            nodes: data.children.map(child => Templates.render('menu-item', { data: child, state }))
        }] : [])
    });
    register(node, data.key, { node, key: data.key });
    return node;
});
Templates.withoutKey('main', (config, register, controller) => {
    const node = Elements.build({ tag: 'main' });
    register(node, { node, cache: new Map });
    controller.onRender();
    return node;
});
Templates.withoutKey('home', (config, register, controller) => {
    const node = Elements.build({
        id: 'home',
        child: {
            id: 'home-container',
            children: [
                { tag: 'h2', text: 'Elements' },
                {
                    tag: 'p',
                    text: 'A 2KB library for fast DOM building without frameworks.'
                },
                {
                    tag: 'a',
                    text: 'DOWNLOAD',
                    atts: {
                        href: 'elements.min.js',
                        download: 'elements.min.js'
                    }
                }
            ]
        }
    });
    register(node, node);
    return node;
});
Templates.withoutKey('search-results', ({ query }, register, controller) => {
    const list = Elements.build({ tag: 'ul' });
    const node = Elements.build({
        id: 'search-results',
        nodes: [
            Elements.build({ tag: 'h2', text: `Results for /${query}/gi` }),
            list
        ]
    });
    register(node, { list });
    controller.onRender(query);
    return node;
});
Templates.withUniqueKey('search-result', (data, register, controller) => {
    const node = Elements.build({
        tag: 'li',
        text: data.title,
        on: { click: controller.onClick.bind(controller, data.key) }
    });
    return node;
});
Templates.withUniqueKey('article', ({ key }, register, controller) => {
    const node = Elements.build({ tag: 'article' });
    register(node, key, node);
    controller.onRender(key);
    return node;
});
Templates.controllerFor('layout', instances => {

    window.addEventListener('load', event => {
        const fragment = Templates.render('layout');
        document.body.appendChild(fragment);
    }, { once: true, passive: true });

    Events.when('opening-sidebar', event => {
        const instance = instances.get();
        if (instance) {
            clearTimeout(instance.timeoutId);
            instance.overlay.classList.remove('hidden');
            instance.timeoutId = setTimeout(() => {
                instance.overlay.classList.remove('invisible');
            }, 100);
        }
    })

    Events.when('closing-sidebar', event => {
        const instance = instances.get();
        if (instance) {
            clearTimeout(instance.timeoutId);
            instance.overlay.classList.add('invisible');
            instance.timeoutId = setTimeout(() => {
                instance.overlay.classList.add('hidden');
            }, 400);
        }
    });

    return {

        onOverlayClick(event) {
            const instance = instances.get();
            if (instance && instance.overlay === event.target) {
                Events.dispatch('closing-sidebar');
            }
        }

    };
});
Templates.controllerFor('toolbar', instances => {
    return {

        onTitleClick() {
            Events.dispatch('routing', { template: 'home' });
        },

        onSearchInputFocus() {
            const instance = instances.get();
            if (instance) {
                instance.search.classList.add('focused');
            }
        },

        onSearchInputBlur() {
            const instance = instances.get();
            if (instance) {
                instance.search.classList.remove('focused');
                instance.searchInput.value = '';
            }
        },

        onSearchInputKeyUp() {
            const instance = instances.get();
            if (instance) {
                Events.dispatch('routing', { template: 'search-results', params: { query: instance.searchInput.value.trim() } });
            }
        },

        onMenuButtonClick() {
            Events.dispatch('opening-sidebar');
        }

    };
});
Templates.controllerFor('sidebar', instances => {

    Events.when('opening-sidebar', event => {
        const instance = instances.get();
        if (instance) {
            instance.node.classList.add('open');
        }
    });

    Events.when('closing-sidebar', event => {
        const instance = instances.get();
        if (instance) {
            instance.node.classList.remove('open');
        }
    });

    return {

        onRender() {
            const articles = Articles.all();
            const instance = instances.get();
            const state = Routes.get();
            if (instance && articles instanceof Array) {
                const fragment = document.createDocumentFragment();
                for (let data of articles) {
                    let node = Templates.render('menu-item', { data, state });
                    fragment.appendChild(node);
                }
                instance.menu.appendChild(fragment);
            }
        }

    };
});
Templates.controllerFor('menu-item', instances => {

    Events.when('routing', event => {
        const { template, params } = event.detail;
        if (template === 'article') {
            for (let instance of instances.all()) {
                if (instance.key === params.key)
                    instance.node.classList.add('active');
                else
                    instance.node.classList.remove('active');
                if (params.key.startsWith(instance.key))
                    instance.node.classList.add('open');
                else
                    instance.node.classList.remove('open');
            }
        } else {
            for (let instance of instances.all()) {
                instance.node.classList.remove('active', 'open');
            }
        }
    });

    return {

        onButtonClick(key) {
            Events.dispatch('routing', { template: 'article', params: { key } });
            Events.dispatch('closing-sidebar');
        }

    };
});
Templates.controllerFor('main', instances => {

    function hash(template, params) {
        return btoa(JSON.stringify({ template, params }));
    }

    function build({ template, params }) {
        const instance = instances.get();
        const hashed = hash(template, params);
        if (instance) {
            if (instance.content)
                instance.node.removeChild(instance.content);
            if (instance.cache.has(hashed))
                instance.content = instance.cache.get(hashed);
            else {
                instance.content = Templates.render(template, params);
                instance.cache.set(hashed, instance.content);
            }
            instance.node.appendChild(instance.content);
        }
    }

    Events.when('routing', event => build(event.detail));

    return {

        onRender() {
            build(Routes.get());
        }

    };
});
Templates.controllerFor('search-results', instances => {

    return {

        onRender(query) {
            const instance = instances.get();
            if (instance) {
                const results = Articles.search(query);
                Elements.removeChildren(instance.list);
                const fragment = document.createDocumentFragment();
                for (let result of results) {
                    let node = Templates.render('search-result', result);
                    fragment.appendChild(node);
                }
                instance.list.appendChild(fragment)
            }
        }

    };
});
Templates.controllerFor('search-result', instances => ({

    onClick(key) {
        Events.dispatch('routing', { template: 'article', params: { key } });
    }

}));
Templates.controllerFor('article', instances => {

    const controller = {

        onRender(key) {
            const instance = instances.get(key);
            const data = Articles.get(key);
            if (instance && data) {
                Elements.removeChildren(instance);
                Elements.build({ tag: 'h2', text: data.title, appendTo: instance });
                if (data.render) {
                    if (data.render instanceof Array) {
                        const fragment = Elements.buildFragment(data.render);
                        instance.appendChild(fragment);
                    } else {
                        const node = Elements.build(data.render);
                        instance.appendChild(node);
                    }
                }
            }
        }

    };

    Events.when('article-updated', event => controller.onRender(event.detail));

    return controller;
});
