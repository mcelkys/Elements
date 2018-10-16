Templates.withoutKey('toolbar', (config, register, controller) => {
    const search = Elements.build({
        id: 'search',
        children: [
            { class: 'icon' },
            {
                tag: 'input',
                attributes: { type: 'text', placeholder: 'Search...' },
                listeners: {
                    focus: controller.onSearchInputFocus.bind(controller),
                    blur: controller.onSearchInputBlur.bind(controller)
                }
            }
        ]
    });
    const node = Elements.build({
        tag: 'nav',
        id: 'toolbar',
        children: [
            { tag: 'h1', text: 'Elements' },
            { id: 'search-wrapper', node: search },
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
    register(node, { search });
    return node;
});
