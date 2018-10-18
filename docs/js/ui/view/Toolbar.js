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
                children: [
                    { tag: 'span', text: 'Elements' },
                    { tag: 'span', id: 'version', text: '1.3.1' }
                ]
            },
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
    register(node, { search, searchInput });
    return node;
});
