Articles.define('afterNode', Macro => [
    {
        tag: 'p',
        html: `Assures that the resulting ${Macro.HTML_ELEMENT} is inserted into
        the ${Macro.NODE} hierarchy as a <i>child node</i> of the <i>parent node</i>
        of the <i>reference node</i>, appearing immediately after the <i>reference
        node</i>.`
    }
]);
