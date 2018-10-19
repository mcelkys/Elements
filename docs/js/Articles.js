const Articles = (function() {

    var hierarchy = [];
    const byKey = new Map;
    const byTitle = new Map;
    var macros = {};
    var deferRetrievalBy = 0;

    function processDeclaration(articles, parentKey) {
        articles.forEach((article, index) => {
            const key = Uint32Array.of(...parentKey, index);
            article.key = key.join(':');
            article.retrieved = false;
            byKey.set(article.key, article);
            byTitle.set(article.title, article);
            if (article.src) {
                deferRetrievalBy += 2000;
                setTimeout(retrieve.bind(this, article), deferRetrievalBy);
            }
            if (article.children instanceof Array)
                processDeclaration(article.children, key);
        });
    }

    function compileRegex(query) {
        try {
            return new RegExp(query, 'gi');
        } catch(e) {
            return new RegExp;
        }
    }

    function retrieve(article) {
        if (article && !article.retrieved && typeof article.src === 'string') {
            Elements.build({
                tag: 'script',
                atts: { type: 'application/javascript', src: article.src },
                set: { async: true, defer: true },
                appendTo: document.head
            });
        }
    }

    return {

        macros(all) {
            Object.assign(macros, all);
        },

        declare(articles) {
            hierarchy = articles;
            processDeclaration(articles, new Uint32Array);
        },

        define(title, ctr) {
            const article = byTitle.get(title);
            if (article) {
                article.retrieved = true;
                article.render = ctr(Object.assign({}, macros));
                Events.dispatch('article-updated', article.key);
            }
        },

        all() {
            return hierarchy;
        },

        get(key) {
            const article = byKey.get(key);
            retrieve(article);
            return article;
        },

        search(query) {
            const regex = compileRegex(query);
            return Array.from(byTitle.values()).filter(article => regex.test(article.title));
        }

    };

})();
