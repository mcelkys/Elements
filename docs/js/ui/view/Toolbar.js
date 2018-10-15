Templates.withoutKey('toolbar', (config, register, controller) => {
    const node = Elements.build({
        tag: 'nav',
        id: 'toolbar',
        children: [
            { tag: 'h1', text: 'Elements' },
            {
                id: 'search',
                children: [
                    { class: 'icon' },
                    { tag: 'input', attributes: { type: 'text', placeholder: 'Search...' } }
                ]
            },
            {
                id: 'external-links',
                children: [
                    {
                        tag: 'a',
                        class: 'icon',
                        style: { 'background-image': 'url(img/GitHub-Mark-32px.png)' },
                        href: 'https://github.com/mcelkys/Elements'
                    }
                ]
            }
        ]
    });
    register(node);
    return node;
});
