const Articles = (function() {

    const retrieved =  fetch('articles.json').then(response => response.json()).then(articles => assignKeys(articles, new Uint32Array));
    const lookup = new Map;

    function assignKeys(articles, parentKey) {
        articles.forEach((article, index) => {
            const key = Uint32Array.of(...parentKey, index);
            article.key = key.join(':');
            lookup.set(article.key, article);
            if (article.children instanceof Array)
                assignKeys(article.children, key);
        });
        return articles;
    }

    function compileRegex(query) {
        try {
            return new RegExp(query, 'ig');
        } catch(e) {
            return new RegExp;
        }
    }

    return {

        retrieve() {
            return Promise.resolve(retrieved);
        },

        get(key) {
            return new Promise((resolve, reject) => {
                this.retrieve().then(articles => {
                    resolve(lookup.get(key));
                }).catch(reject);
            });
        },

        search(query) {
            const regex = compileRegex(query);
            return new Promise((resolve, reject) => {
                this.retrieve().then(articles => {
                    resolve(Array.from(lookup.values()).filter(article => regex.test(article.title)));
                }).catch(reject);
            });
        }

    };

})();
