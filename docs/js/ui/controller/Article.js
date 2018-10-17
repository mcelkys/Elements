Templates.controllerFor('article', instances => ({

    onRender(key) {
        const instance = instances.get(key);
        const data = Articles.get(key);
        if (instance && data) {
            Elements.build({ tag: 'h2', text: data.title, appendTo: instance });
            const fragment = Elements.buildFragment(data.render || []);
            instance.appendChild(fragment);
        }
    }

}));
