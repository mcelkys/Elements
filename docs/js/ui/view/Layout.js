Templates.withoutKey('layout', (config, register, controller) => {
    const fragment = document.createDocumentFragment();
    const toolbar = Templates.render('toolbar');
    const wrapper = Elements.build({
        id: 'content-wrapper',
        nodes: [
            Templates.render('sidebar'),
            Templates.render('main')
        ]
    });
    fragment.appendChild(toolbar);
    fragment.appendChild(wrapper);
    register(fragment);
    return fragment;
});
