Templates.controllerFor('article', instances => {

    const controller = {
        
        onRender(key) {
            const instance = instances.get(key);
            const data = Articles.get(key);
            if (instance && data) {
                Elements.removeAllChildren(instance);
                Elements.build({ tag: 'h2', text: data.title, appendTo: instance });
                if (data.render) {
                    if (data.render instanceof Array) {
                        const fragment = Elements.buildFragment(data.render);
                        instance.appendChild(fragment);
                    } else {
                        const node = Elements.build(data.render);
                        instance.appendChild(node);
                    }
                }
            }
        }

    };

    Events.when('article-updated', event => controller.onRender(event.detail));

    return controller;
});
