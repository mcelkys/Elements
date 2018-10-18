Templates.controllerFor('main', instances => {

    function hash(template, params) {
        return btoa(JSON.stringify({ template, params }));
    }

    function build({ template, params }) {
        const instance = instances.get();
        const hashed = hash(template, params);
        if (instance) {
            if (instance.content)
                instance.node.removeChild(instance.content);
            if (instance.cache.has(hashed))
                instance.content = instance.cache.get(hashed);
            else {
                instance.content = Templates.render(template, params);
                instance.cache.set(hashed, instance.content);
            }
            instance.node.appendChild(instance.content);
        }
    }

    Events.when('routing', event => build(event.detail));

    return {

        onRender() {
            build(Routes.get());
        }

    };
});
