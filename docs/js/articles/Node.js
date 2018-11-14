Articles.define('node', Macro => [
    {
        tag: 'p',
        html: `Appends a single child ${Macro.NODE}. This option is designed to
        add a single ${Macro.NODE} instance (one that is ready to be appended
        and does not need to be built from an <b>options</b> ${Macro.OBJECT}) as the
        contents of the resulting ${Macro.HTML_ELEMENT}. Note that if you require to
        add multiple ${Macro.NODE} instances, you can use the ${Macro.NODES} option.`
    },
    {
        tag: 'section',
        class: 'warning',
        children: [
            {
                tag: 'p',
                html: `Note: ${Macro.CHILD}, ${Macro.CHILDREN}, ${Macro.NODES}, <b>node</b>,
                ${Macro.TEXT} and ${Macro.HTML} options are designed to be used separately
                because they all provide different ways of creating nested content. Using
                a combination of the above options may produce unexpected results. The
                order in which options get evaluated is not predictable, as a
                result nodes may be added in inconsistent order or overwritten. In most JavaScript
                engines, options will be evaluated in the order that they were defined,
                however no JavaScript engine actually guarantees that.`
            },
            {
                tag: 'p',
                html: `Because <b>options</b> are defined in a plain ${Macro.OBJECT},
                <i>Elements</i> library internally uses a ${Macro.FORIN} loop to process
                them. For more information on why options are evaluated in arbitrary order,
                please see this <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#Description">description</a>.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Value' },
            {
                tag: 'p',
                html: `A ${Macro.NODE} instance that will be appended to the resulting ${Macro.HTML_ELEMENT}.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates a paragraph. It then creates
                a ${Macro.DIV} with the pre-built paragraph as its child node.`
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
`const p = Elements.create({
    tag: 'p',
    text: 'Lorem ipsum...'
});
Elements.create({
    class: 'css-selector',
    node: p
});`
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
`<div class="css-selector">
    <p>Lorem ipsum...</p>
</div>`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
