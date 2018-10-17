Templates.withUniqueKey('article', ({ key }, register, controller) => {
    const node = Elements.build({ tag: 'article' });
    register(node, key, node);
    controller.onRender(key);
    return node;
});
