const LexicalParser = (function() {

    const JS_KEYWORDS = [ /class/g, /break/g, /continue/g, /if/g, /else/g, /switch/g, /throw/g, /try/g, /catch/g, /var/g, /const/g, /let/g,
        /function/g, /function\*/g, /async/g, /do/g, /while/g, /for/g, /in/g, /of/g, /debugger/g, /export/g, /import/g, /yield/g,
        /yield\*/g, /await/g, /new/g, /delete/g, /typeof/g, /instanceof/g ];

    return {

        js(code) {
            return JS_KEYWORDS.reduce((parsing, regex) => parsing.replace(regex, `<span class="js-keyword">${regex.source}</span>`), code);
        }

    };
})();
