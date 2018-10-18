Templates.controllerFor('sidebar', instances => {

    Events.when('opening-sidebar', event => {
        const instance = instances.get();
        if (instance) {
            instance.node.classList.add('open');
        }
    });

    Events.when('closing-sidebar', event => {
        const instance = instances.get();
        if (instance) {
            instance.node.classList.remove('open');
        }
    });

    return {

        onRender() {
            const articles = Articles.all();
            const instance = instances.get();
            const state = Routes.get();
            if (instance && articles instanceof Array) {
                const fragment = document.createDocumentFragment();
                for (let data of articles) {
                    let node = Templates.render('menu-item', { data, state });
                    fragment.appendChild(node);
                }
                instance.menu.appendChild(fragment);
            }
        }

    };
});
