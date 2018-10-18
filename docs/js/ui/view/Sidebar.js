Templates.withoutKey('sidebar', (config, register, controller) => {
    const menu = Elements.build({ tag: 'ul' });
    const node = Elements.build({ tag: 'aside', node: menu });
    register(node, { menu, node });
    controller.onRender();
    return node;
});
