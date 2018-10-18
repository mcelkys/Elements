Templates.controllerFor('menu-item', instances => {

    Events.when('routing', event => {
        const { template, params } = event.detail;
        if (template === 'article') {
            for (let instance of instances.all()) {
                if (instance.key === params.key)
                    instance.node.classList.add('active');
                else
                    instance.node.classList.remove('active');
                if (params.key.startsWith(instance.key))
                    instance.node.classList.add('open');
                else
                    instance.node.classList.remove('open');
            }
        } else {
            for (let instance of instances.all()) {
                instance.node.classList.remove('active', 'open');
            }
        }
    });

    return {

        onButtonClick(key) {
            Events.dispatch('routing', { template: 'article', params: { key } });
            Events.dispatch('closing-sidebar');
        }

    };
});
