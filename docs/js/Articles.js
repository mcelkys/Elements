const Articles = (function() {

    const retrieved =  fetch('articles.json').then(response => response.json());

    return {

        get: () => Promise.resolve(retrieved)

    };

})();
