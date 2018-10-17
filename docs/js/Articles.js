const Articles = (function() {

    var all = [];
    const lookup = new Map;

    function assignKeys(articles, parentKey) {
        articles.forEach((article, index) => {
            const key = Uint32Array.of(...parentKey, index);
            article.key = key.join(':');
            lookup.set(article.key, article);
            if (article.children instanceof Array)
                assignKeys(article.children, key);
        });
    }

    function compileRegex(query) {
        try {
            return new RegExp(query, 'gi');
        } catch(e) {
            return new RegExp;
        }
    }

    return {

        set(articles) {
            assignKeys(articles, new Uint32Array);
            all = articles;
        },

        all() {
            return all;
        },

        get(key) {
            return lookup.get(key);
        },

        search(query) {
            const regex = compileRegex(query);
            return Array.from(lookup.values()).filter(article => regex.test(article.title));
        }

    };

})();
