Templates.controllerFor('sidebar', instances => {

    return {

        onRender() {
            Articles.get().then(articles => {
                const instance = instances.get();
                if (instance && articles instanceof Array) {
                    const fragment = document.createDocumentFragment();
                    for (let data of articles) {
                        let node = Templates.render('menu-item', data);
                        fragment.appendChild(node);
                    }
                    instance.menu.appendChild(fragment);
                }
            });
        }

    };
});
