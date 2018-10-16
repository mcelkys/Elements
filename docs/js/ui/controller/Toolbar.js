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
            }
        }

    };
});
