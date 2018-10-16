Templates.withUniqueKey('search-result', (data, register, controller) => {
    const node = Elements.build({ tag: 'li', text: data.title });
    return node;
});
