Articles.define('id', Macro => [
    {
        tag: 'p',
        html: `Assigns an <i>id</i> attribute to the resulting ${Macro.HTML_ELEMENT}.
        This option functionally equivalent to adding an <i>id</i> property to the
        ${Macro.ATTRIBUTES}, however because <i>id</i> is a very common attribute,
        this <b>option</b> provides a more convenient and more performant
        way to do that.`
    },
    {
        tag: 'p',
        html: `It is worth noting that the ${Macro.ELEMENTS_CREATE} function
        returns a reference to the ${Macro.HTML_ELEMENT}. It is more efficient
        to retain said reference or store it in a collection, such as a ${Macro.MAP},
        than to retrieve it from the DOM after the fact.`
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Value' },
            {
                tag: 'p',
                html: `A ${Macro.STRING} value for the <i>id</i> attribute. This is
                commonly used for CSS selectors or to assign a unique identifier to
                the ${Macro.HTML_ELEMENT}, so that it could later be easily retrieved from
                the DOM.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates a ${Macro.DIV} with an identifier.`
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
    id: 'el-102'
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
`<div id="el-102"></div>`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
