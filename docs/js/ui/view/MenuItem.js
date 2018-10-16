Templates.withoutKey('menu-item', (data, register, controller) => {
    const node = Elements.build({
        tag: 'li',
        children: ([
            {
                tag: 'button',
                text: data.title,
                on: {
                    click: event => controller.onLabelClick(node)
                }
            }
        ]).concat(data.children instanceof Array ? [{
            tag: 'ul',
            nodes: data.children.map(Templates.render.bind(Templates, 'menu-item'))
        }] : [])
    });
    return node;
});
