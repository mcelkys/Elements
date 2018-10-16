Templates.controllerFor('main', instances => {

    function build({ template, params }) {
        const instance = instances.get();
        if (instance && template === 'search-results') {
            if (instance.content)
                instance.node.removeChild(instance.content);
            instance.content = Templates.render(template, params);
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
