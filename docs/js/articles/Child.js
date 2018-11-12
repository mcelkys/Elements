Articles.define('child', Macro => [
    {
        tag: 'p',
        html: `Creates a single child ${Macro.HTML_ELEMENT}. The
        <b>child</b> option is best used when the resulting ${Macro.HTML_ELEMENT} only needs to
        have a single child element, which does not need to be pre-built ahead of time (i.e.
        you do not need to have a reference to a built ${Macro.HTML_ELEMENT} instance of the
        child). It is also worth noting that the <b>child</b> option executes a tiny bit
        faster, when compared to using ${Macro.CHILDREN} to construct a single child.`
    },
    {
        tag: 'section',
        class: 'warning',
        children: [
            {
                tag: 'p',
                html: `While technically you can use <b>child</b> in combination
                with ${Macro.CHILDREN}, ${Macro.NODE_} and ${Macro.NODES}, these
                options are designed to be used separately because they all provide
                different ways of adding child nodes. Using a combination of the above
                option will produce <i>correct</i> results (i.e. all desired child
                nodes will be appended), however the results might not always be exactly
                as expected. The order in which different options get evaluated is not
                predictable, as a result nodes may be added in
                inconsistent order. In most JavaScript engine, options will be evaluated
                in the order that they were defined, however no JavaScript engine
                actually guarantees that.`
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
                html: `A valid <b>options</b> ${Macro.OBJECT} that could be used with
                ${Macro.ELEMENTS_CREATE} function on its own.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates a ${Macro.DIV} with a single
                nested child instance.`
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
    class: 'css-selector',
    child: {
        tag: 'p',
        text: 'Lorem ipsum...'
    }
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
