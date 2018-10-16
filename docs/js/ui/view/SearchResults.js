Templates.withoutKey('search-results', ({ query }, register, controller) => {
    const node = Elements.build({ tag: 'ul', id: 'search-results' });
    register(node, node);
    controller.onRender(query);
    return node;
});
