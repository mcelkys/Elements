Templates.withUniqueKey('search-result', (data, register, controller) => {
    const node = Elements.build({
        tag: 'li',
        text: data.title,
        on: { click: controller.onClick.bind(controller, data.key) }
    });
    return node;
});
