Templates.controllerFor('article', instances => {

    const controller = {

        onRender(key) {
            const instance = instances.get(key);
            const data = Articles.get(key);
            if (instance && data) {
                Elements.removeChildren(instance);
                Elements.create({ tag: 'h2', text: data.title, appendTo: instance });
                if (data.id) instance.id = data.id;
                if (data.render) {
                    if (data.render instanceof Array) {
                        const fragment = Fragments.create(data.render);
                        instance.appendChild(fragment);
                    } else {
                        const node = Elements.create(data.render);
                        instance.appendChild(node);
                    }
                }
            }
        }

    };

    Events.when('article-updated', event => controller.onRender(event.detail));

    return controller;
});
