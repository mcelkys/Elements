Templates.controllerFor('search-results', instances => {

    return {

        onRender(query) {
            const instance = instances.get();
            if (instance) {
                Articles.search(query).then(results => {
                    Elements.removeAllChildren(instance);
                    const fragment = document.createDocumentFragment();
                    for (let result of results) {
                        let node = Templates.render('search-result', result);
                        fragment.appendChild(node);
                    }
                    instance.appendChild(fragment);
                });
            }
        }

    };
});
