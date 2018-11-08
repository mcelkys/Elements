Articles.define('child', Macro => [
    {
        tag: 'p',
        html: `Creates a single child ${Macro.HTML_ELEMENT}. Note that while technically,
        you can use <b>child</b> in combination with ${Macro.CHILDREN}, ${Macro.NODE_} and
        ${Macro.NODES}, these options are designed to be used separately. As a result,
        <b>child</b> is best used when the resulting ${Macro.HTML_ELEMENT} only needs to
        have a single child element, which does not need to be pre-built ahead of time (i.e.
        you do not need to have a reference to a built ${Macro.HTML_ELEMENT} instance of the child).`
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Value' },
            {
                tag: 'p',
                html: `A valid <b>options</b> ${Macro.OBJECT} that could be used with
                ${Macro.ELEMENTS_CREATE} function on its own.`
            }
        ]
    },
]);
