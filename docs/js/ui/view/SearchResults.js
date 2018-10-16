Templates.withoutKey('search-results', ({ query }, register, controller) => {
    const list = Elements.build({ tag: 'ul' });
    const node = Elements.build({
        id: 'search-results',
        nodes: [
            Elements.build({ tag: 'h2', text: `Results for /${query}/ig` }),
            list
        ]
    });
    register(node, { list });
    controller.onRender(query);
    return node;
});
