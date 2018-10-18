Templates.controllerFor('layout', instances => {

    window.addEventListener('load', event => {
        const fragment = Templates.render('layout');
        document.body.appendChild(fragment);
    }, { once: true, passive: true });

    Events.when('opening-sidebar', event => {
        const instance = instances.get();
        if (instance) {
            clearTimeout(instance.timeoutId);
            instance.overlay.classList.remove('hidden');
            instance.timeoutId = setTimeout(() => {
                instance.overlay.classList.remove('invisible');
            }, 100);
        }
    })

    Events.when('closing-sidebar', event => {
        const instance = instances.get();
        if (instance) {
            clearTimeout(instance.timeoutId);
            instance.overlay.classList.add('invisible');
            instance.timeoutId = setTimeout(() => {
                instance.overlay.classList.add('hidden');
            }, 400);
        }
    });

    return {

        onOverlayClick() {
            const instance = instances.get();
            if (instance && instance.overlay === event.target) {
                Events.dispatch('closing-sidebar');
            }
        }

    };
});
