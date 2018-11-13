Articles.define('class', Macro => [
    {
        tag: 'p',
        html: `Assigns a <i>class</i> attribute to the resulting ${Macro.HTML_ELEMENT}.
        This option functionally equivalent to adding a <i>class</i> property to the
        ${Macro.ATTRIBUTES}, however because <i>class</i> is a very common attribute,
        this <b>option</b> provides a more convenient and more performant
        way to do that.`
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Value' },
            {
                tag: 'p',
                html: `A ${Macro.STRING} value for the <i>class</i> attribute. This is
                commonly used for CSS selectors.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates a ${Macro.DIV} with a CSS class
                selector.`
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
    class: 'css-selector'
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
`<div class="css-selector"></div>`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
