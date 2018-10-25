Articles.define('Sandbox', Macro => {
    const output = Elements.create({ tag: 'iframe', class: 'flexing' });
    var script, style, lib, scriptTimeoutId, styleTimeoutId;

    const styleEditor = Elements.create({
        class: 'flexing padded editor',
        contentEditable: 'true',
        placeholder: 'Enter your CSS here...',
        on: {
            keyup: event => {
                clearTimeout(styleTimeoutId);
                styleTimeoutId = setTimeout(injectStyle, 1000);
            }
        }
    });
    const scriptEditor = Elements.create({
        class: 'flexing padded editor',
        contentEditable: 'true',
        placeholder: 'Use JavaScript and Elements libary here...',
        on: {
            keyup: event => {
                clearTimeout(scriptTimeoutId);
                scriptTimeoutId = setTimeout(injectScript, 1000);
            }
        }
    });

    fetch('elements.min.js').then(r => r.text()).then(code => {
        lib = Elements.create({ tag: 'script', text: code });
    });

    function head() {
        return output.contentDocument.head;
    }
    function body() {
        return output.contentDocument.body;
    }

    function onError(event) {
        Elements.removeChildren(body());
        Elements.create({
            tag: 'pre',
            style: { margin: '10px' },
            child: { tag: 'samp', text: event.error.stack },
            appendTo: body()
        });
    }

    function injectStyle() {
        const base = (style && head().contains(style)) ? { replaceNode: style } : { appendTo: head() };
        style = Elements.create(Object.assign(base, { tag: 'style', text: styleEditor.textContent }));
    }
    function injectScript() {
        const base = (script && head().contains(script)) ? { replaceNode: script } : { appendTo: head() };
        if (lib && !head().contains(lib)) {
            if (lib.parentNode) lib.parentNode.removeChild(lib);
            head().appendChild(lib);
        }
        output.contentWindow.addEventListener('error', onError, { passive: true });
        Elements.removeChildren(body());
        script = Elements.create(Object.assign(base, { tag: 'script', text: scriptEditor.textContent }));
    }

    return {
        class: 'flexing flexed',
        children: [
            {
                class: 'flexing flexed padded column',
                children: [
                    {
                        class: 'flexing flexed column',
                        nodes: [ Elements.create({ tag: 'h3', text: 'CSS' }), styleEditor ]
                    },
                    {
                        class: 'flexing flexed column',
                        nodes: [ Elements.create({ tag: 'h3', text: 'JavaScript' }), scriptEditor ]
                    }
                ]
            },
            {
                class: 'flexing flexed padded column',
                nodes: [ Elements.create({ tag: 'h3', text: 'Result' }), output ]
            }
        ]
    };
});
