const State = (function() {

    const json = atob(location.hash[0] === '#' ? location.hash.slice(1) :  location.hash);
    const state = json.length > 0 ? JSON.parse(json) : {};

})();
