Templates.withoutKey('layout', (config, register, controller) => {
    const fragment = document.createDocumentFragment();
    const toolbar = Templates.render('toolbar');
    fragment.appendChild(toolbar);
    const content = Elements.create({
        id: 'content-wrapper',
        nodes: [
            Templates.render('sidebar'),
            Templates.render('main')
        ],
        appendTo: fragment
    });
    const overlay = Elements.create({
        id: 'overlay',
        class: 'invisible hidden',
        on: { click: controller.onOverlayClick.bind(controller) },
        appendTo: fragment
    });
    register(content, { overlay });
    return fragment;
});
