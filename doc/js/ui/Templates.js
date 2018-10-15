const Templates = (function() {
    const renderers = new Map;
    const controllers = new Map;

    return {

        withoutKey(name, renderer) {
            InstanceManager.forUnbound(name);
            renderers.set(name, renderer);
        },

        withUniqueKey(name, renderer) {
            InstanceManager.forStrictlyBound(name);
            renderers.set(name, renderer);
        },

        withCommonKey(name, renderer) {
            InstanceManager.forLooselyBound(name);
            renderers.set(name, renderer);
        },

        render(template, config) {
            const manager = InstanceManager.get(template);
            const controller = controllers.get(template);
            const render = renderers.get(template);
            InstanceManager.scheduleGarbageCollection();
            return render(config, manager.register.bind(manager), controller);
        },

        controllerFor(template, ctor) {
            const manager = InstanceManager.get(template);
            const controller = ctor(manager);
            controllers.set(template, controller);
        }

    };
})();
