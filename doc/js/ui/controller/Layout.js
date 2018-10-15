Templates.controllerFor('layout', instances => {

    window.addEventListener('load', event => {
        const fragment = Templates.render('layout');
        document.body.appendChild(fragment);
    }, { once: true, passive: true });

});
