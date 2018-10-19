Templates.controllerFor('toolbar', instances => {
    return {

        onTitleClick() {
            Events.dispatch('routing', { template: 'home' });
        },

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
        },

        onMenuButtonClick() {
            Events.dispatch('opening-sidebar');
        }

    };
});
