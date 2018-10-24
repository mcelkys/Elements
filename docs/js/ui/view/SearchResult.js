Templates.withUniqueKey('search-result', (data, register, controller) => {
    const node = Elements.create({
        tag: 'li',
        text: data.title,
        on: { click: controller.onClick.bind(controller, data.key) }
    });
    return node;
});
