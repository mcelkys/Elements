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
