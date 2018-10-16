Templates.withoutKey('main', (config, register, controller) => {
    const node = Elements.build({ tag: 'main' });
    register(node, { node });
    controller.onRender();
    return node;
});
