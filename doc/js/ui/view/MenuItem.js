Templates.withoutKey('menu-item', (data, register, controller) => {
    const node = Elements.build({
        tag: 'li',
        children: [
            {
                tag: 'label',
                text: data.name,
                listeners: {
                    click: event => controller.onLabelClick(node)
                }
            },
            {
                tag: 'ul',
                nodes: data.children instanceof Array ? data.children.map(Templates.render.bind(Templates, 'menu-item')) : []
            }
        ]
    });
    return node;
});
