Templates.withUniqueKey('article', ({ key }, register, controller) => {
    const node = Elements.create({ tag: 'article' });
    register(node, key, node);
    controller.onRender(key);
    return node;
});
