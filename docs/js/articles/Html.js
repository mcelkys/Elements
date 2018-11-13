Articles.define('html', Macro => [
    {
        tag: 'p',
        html: `Processes the value as inner HTML of the resulting ${Macro.HTML_ELEMENT}.
        This option can be used to embed large amounts of HTML content into an
        ${Macro.HTML_ELEMENT}, however it is designed to act an enhanced version
        of the ${Macro.TEXT} option, where parts of the text content could be wrapped
        in HTML for styling purposes. That being said, it is more efficient
        to use ${Macro.TEXT} when the content does not need to contain any HTML markup.`
    },
    {
        tag: 'section',
        class: 'warning',
        children: [
            {
                tag: 'p',
                html: `Note: ${Macro.CHILD}, ${Macro.CHILDREN}, ${Macro.NODES}, ${Macro.NODE_},
                ${Macro.TEXT} and <b>html</b> options are designed to be used separately
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
                html: `A ${Macro.STRING} containing HTML content.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates a paragraph with HTML content.`
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
`Elements.create({
    tag: 'p',
    html: \`<b>JavaScript</b> (JS) is a lightweight
    interpreted or <a href="/jit">JIT-compiled</a>
    programming language with first-class functions.\`
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
`<p>
    <b>JavaScript</b> (JS) is a lightweight
    interpreted or <a href="/jit">JIT-compiled</a>
    programming language with first-class functions.
</p>`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
