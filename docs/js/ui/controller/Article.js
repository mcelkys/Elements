Templates.controllerFor('article', instances => ({

    onRender(key) {
        const instance = instances.get(key);
        if (instance) {
            Articles.get(key).then(data => {
                Elements.build({ tag: 'h2', text: data.title, appendTo: instance });
                const fragment = Elements.buildFragment(data.render || []);
                instance.appendChild(fragment);
            });
        }
    }

}));
