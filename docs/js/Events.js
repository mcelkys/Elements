const Events = (function() {
    const target = new EventTarget;

    return {

        generate(type, detail) {
            return new CustomEvent(type, { detail });
        },

        dispatch(type, detail) {
            const event = this.generate(type, detail);
            this.propagate(event);
        },

        propagate(event) {
            setTimeout(target.dispatchEvent.bind(target, event), 0);
        },

        when(type, handler) {
            target.addEventListener(type, handler, {
                passive: true,
                capture: false
            });
        },

        once(type, handler) {
            target.addEventListener(type, handler, {
                passive: true,
                capture: false,
                once: true
            });
        },

        remove(type, handler) {
            target.removeEventListener(type, handler, false);
        }

    };
})();
