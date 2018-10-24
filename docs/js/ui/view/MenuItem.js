Templates.withUniqueKey('menu-item', ({ data, state }, register, controller) => {
    const node = Elements.create({
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
