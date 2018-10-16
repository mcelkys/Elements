Templates.controllerFor('toolbar', instances => {
    return {

        onSearchInputFocus() {
            const instance = instances.get();
            if (instance) {
                instance.search.classList.add('focused');
            }
        },

        onSearchInputBlur() {
            const instance = instances.get();
            if (instance) {
                instance.search.classList.remove('focused');
                instance.searchInput.value = '';
            }
        },

        onSearchInputKeyUp() {
            const instance = instances.get();
            if (instance) {
                Events.dispatch('routing', { template: 'search-results', params: { query: instance.searchInput.value.trim() } });
            }
        }

    };
});
