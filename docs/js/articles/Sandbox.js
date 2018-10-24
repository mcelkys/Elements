Articles.define('Sandbox', Macro => {
    const output = Elements.create({ tag: 'iframe', class: 'flexing' });
    var script, style, lib;
    var ready = false;
    fetch('elements.min.js').then(r => r.text()).then(code => {
        lib = code;
    });
    function setup() {
        Elements.create({
            tag: 'script',
            text: lib,
            appendTo: output.contentDocument.head
        });
        output.contentWindow.addEventListener('error', event => {
            Elements.removeChildren(output.contentDocument.body);
            Elements.create({
                tag: 'pre',
                style: { margin: '15px' },
                child: { tag: 'samp', text: event.error.stack },
                appendTo: output.contentDocument.body
            });
        });
        ready = true;
    }
    return {
        class: 'flexing flexed',
        children: [
            {
                class: 'flexing flexed padded column',
                children: [
                    {
                        class: 'flexing flexed column',
                        children: [
                            { tag: 'h3', text: 'CSS' },
                            {
                                tag: 'textarea',
                                class: 'flexing padded',
                                placeholder: 'Enter your CSS here...',
                                on: {
                                    change: event => {
                                        const base = style ? { replaceNode: style } : { appendTo: output.contentDocument.head };
                                        style = Elements.create(Object.assign(base, {
                                            tag: 'style',
                                            text: event.target.value
                                        }));
                                    }
                                }
                            }
                        ]
                    },
                    {
                        class: 'flexing flexed column',
                        children: [
                            { tag: 'h3', text: 'JavaScript' },
                            {
                                tag: 'textarea',
                                class: 'flexing padded',
                                placeholder: 'Use JavaScript and Elements libary here...',
                                on: {
                                    change: event => {
                                        const base = script ? { replaceNode: script } : { appendTo: output.contentDocument.head };
                                        if (!ready) setup();
                                        Elements.removeChildren(output.contentDocument.body);
                                        script = Elements.create(Object.assign(base, {
                                            tag: 'script',
                                            text: event.target.value
                                        }));
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                class: 'flexing flexed padded column',
                nodes: [
                    Elements.create({ tag: 'h3', text: 'Result' }),
                    output
                ]
            }
        ]
    };
});
