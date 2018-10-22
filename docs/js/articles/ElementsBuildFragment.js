Articles.define('Elements.buildFragment()', Macro => [
    {
        tag: 'p',
        html: `Creates a new ${Macro.DOCUMENT_FRAGMENT} instance containing an arbitrary number of ${Macro.HTML_ELEMENT} objects. A
        fragment can be appended as a simple ${Macro.NODE} object. However, keep in mind that the fragment itself
        will not be appendTo the DOM, but rather its contents will be transfered into the target parent ${Macro.NODE} leaving said
        fragment empty. This function is only different from ${Macro.ELEMENTS_BUILD} in it that accepts an ${Macro.ARRAY} of option objects
        (instead of one) and produces a ${Macro.DOCUMENT_FRAGMENT} rather than a single ${Macro.HTML_ELEMENT}.`
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Parameters' },
            {
                tag: 'dl',
                children: [
                    { tag: 'dt', text: 'options' },
                    {
                        tag: 'dd',
                        child: {
                            tag: 'p',
                            html: `(Required) ${Macro.ARRAY} of option ${Macro.OBJECT} instances. Every instance in this ${Macro.ARRAY} must be a valid
                            options object, that can be used with ${Macro.ELEMENTS_BUILD} function. Supplying an empty array will result in an empty
                            ${Macro.DOCUMENT_FRAGMENT}.`
                        }
                    }
                ]
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Returns' },
            { tag: 'p', html: `A new ${Macro.DOCUMENT_FRAGMENT} instance.` }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates a ${Macro.DOCUMENT_FRAGMENT} containing three child elements. The contents
                of the fragment are then transfered to the ${Macro.BODY} of the document.`
            },
            {
                class: 'responsive',
                children: [
                    {
                        tag: 'pre',
                        children: [
                            { tag: 'h4', text: 'JavaScript' },
                            {
                                tag: 'code',
                                text:
`const fragment = Elements.buildFragment([
    { tag: 'h1' },
    { tag: 'form' },
    { tag: 'button' }
]);

document.body.appendChild(fragment);`
                            }
                        ]
                    },
                    {
                        tag: 'pre',
                        children: [
                            { tag: 'h4', text: 'Equivalent HTML' },
                            {
                                tag: 'code',
                                text:
`<body>
    <h1></h1>
    <form></form>
    <button></button>
</body>`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
