(function() {

    Articles.macros({
        HTML_ELEMENT: '<a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"><dfn>HTMLElement</dfn></a>',
        OBJECT: '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><dfn>Object</dfn></a>',
        PROTOTYPE: '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype">prototype</a>',
        WEB_COMPONENTS: '<a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web Components</a>',
        AFTER_NODE: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDowIn19">afterNode</a>',
        APPEND_TO: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxIn19">appendTo</a>',
        ATTRIBUTES: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoyIn19">attributes</a>',
        ATTS: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDozIn19">atts</a>',
        BEFORE_NODE: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo0In19">beforeNode</a>',
        CHILD: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo1In19">child</a>',
        CHILDREN: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo2In19">children</a>',
        CLASS: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo3In19">class</a>',
        HTML: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo4In19">html</a>',
        LISTENERS: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo5In19">listeners</a>',
        NODE_: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxMCJ9fQ==">node</a>',
        NODES: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxMSJ9fQ==">nodes</a>',
        ON: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxMiJ9fQ==">on</a>',
        PREPEND_TO: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxMyJ9fQ==">prependTo</a>',
        REPLACE_NODE: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxNCJ9fQ==">replaceNode</a>',
        SET: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxNSJ9fQ==">set</a>',
        STYLE: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxNiJ9fQ==">style</a>',
        TEXT: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxNyJ9fQ==">text</a>',
        DIV: '<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div"><dfn>&#60;div&#62;</dfn></a>',
        DOCUMENT_FRAGMENT: '<a href="https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment"><dfn>DocumentFragment</dfn></a>',
        NODE: '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Node"><dfn>Node</dfn></a>',
        ELEMENTS_BUILD: '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMCJ9fQ=="><dfn>Elements.build()</dfn></a>',
        ARRAY: '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"><dfn>Array</dfn></a>',
        BODY: '<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body"><dfn>&#60;body&#62;</dfn></a>'
    });

    Articles.declare([
        {
            title: 'Elements.build()',
            src: 'js/articles/ElementsBuild.js',
            children: [
                {
                    title: 'afterNode'
                },
                {
                    title: 'appendTo'
                },
                {
                    title: 'attributes'
                },
                {
                    title: 'atts'
                },
                {
                    title: 'beforeNode'
                },
                {
                    title: 'child'
                },
                {
                    title: 'children'
                },
                {
                    title: 'class'
                },
                {
                    title: 'html'
                },
                {
                    title: 'listeners'
                },
                {
                    title: 'node'
                },
                {
                    title: 'nodes'
                },
                {
                    title: 'on'
                },
                {
                    title: 'prependTo'
                },
                {
                    title: 'replaceNode'
                },
                {
                    title: 'set'
                },
                {
                    title: 'style'
                },
                {
                    title: 'text'
                }
            ]
        },
        {
            title: 'Elements.buildFragment()',
            src: 'js/articles/ElementsBuildFragment.js'
        },
        {
            title: 'Elements.defineProcessor()'
        },
        {
            title: 'Elements.removeAllChildren()'
        }
    ]);

})();
