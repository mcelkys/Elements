Templates.withoutKey('search-results', ({ query }, register, controller) => {
    const list = Elements.create({ tag: 'ul' });
    const node = Elements.create({
        id: 'search-results',
        nodes: [
            Elements.create({ tag: 'h2', text: `Results for /${query}/gi` }),
            list
        ]
    });
    register(node, { list });
    controller.onRender(query);
    return node;
});
