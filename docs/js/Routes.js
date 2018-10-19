const Routes = (function() {

    var state = parse();

    function parse() {
        try {
            return JSON.parse(atob(location.hash[0] === '#' ? location.hash.slice(1) :  location.hash));
        } catch(e) {
            return null;
        }
    }

    function encode() {
        return '#' + btoa(JSON.stringify(state));
    }

    if (!state) {
        state = { template: 'home' };
        location.hash = encode();
    }

    window.addEventListener('hashchange', function() {
        var encoded = encode();
        if (encoded !== location.hash) {
            var parsed = parse();
            if (parsed) Events.dispatch('routing', parsed);
        }
    }, { passive: true });

    Events.when('routing', event => {
        state = event.detail;
        var encoded = encode();
        if (encoded !== location.hash)
            location.hash = encoded;
    });

    return {

        get: () => state

    };
})();
