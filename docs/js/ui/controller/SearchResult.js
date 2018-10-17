Templates.controllerFor('search-result', instances => ({

    onClick(key) {
        Events.dispatch('routing', { template: 'article', params: { key } });
    }

}));
