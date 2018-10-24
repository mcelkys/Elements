Templates.withoutKey('sidebar', (config, register, controller) => {
    const menu = Elements.create({ tag: 'ul' });
    const node = Elements.create({ tag: 'aside', node: menu });
    register(node, { menu, node });
    controller.onRender();
    return node;
});
