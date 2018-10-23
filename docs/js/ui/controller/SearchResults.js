Templates.controllerFor('search-results', instances => {

    return {

        onRender(query) {
            const instance = instances.get();
            if (instance) {
                const results = Articles.search(query);
                Elements.removeChildren(instance.list);
                const fragment = document.createDocumentFragment();
                for (let result of results) {
                    let node = Templates.render('search-result', result);
                    fragment.appendChild(node);
                }
                instance.list.appendChild(fragment)
            }
        }

    };
});
