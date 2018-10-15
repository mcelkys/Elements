Templates.withoutKey('main', (config, register, controller) => {
    const node = Elements.build({ tag: 'main' });
    register(node);
    return node;
});
