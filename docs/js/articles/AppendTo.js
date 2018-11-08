Articles.define('appendTo', Macro => [
    {
        tag: 'p',
        html: `Adds the resulting ${Macro.HTML_ELEMENT} to the reference ${Macro.NODE}
        as the last child node.`
    },
    {
        tag: 'pre',
        child: {
            tag: 'code',
            text:
`<reference>
    ...
    <other></other>
    <other></other>
    <!-- Your HTMLElement will be added here -->
</reference>`
        }
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Value' },
            {
                tag: 'p',
                html: `Reference ${Macro.NODE} instance. The resulting ${Macro.HTML_ELEMENT}
                will be appear in this ${Macro.NODE}, at the end of the child list.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates a ${Macro.UL} list within the
                ${Macro.BODY} with three ${Macro.LI} instances: red, green and blue. It
                then create another item, containing text "YELLOW!" at the end of the list.`
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
`const colors = ['red', 'green', 'blue'];
const list = Elements.create({
    tag: 'ul',
    children: colors.map(color => ({
        tag: 'li',
        text: color
    })),
    appendTo: document.body
});

Elements.create({
    tag: 'li',
    text: 'YELLOW!',
    appendTo: list
});`
                            }
                        ]
                    },
                    {
                        tag: 'pre',
                        children: [
                            { tag: 'h4', text: 'Resulting HTML' },
                            {
                                tag: 'code',
                                text:
`<body>
    <ul>
        <li>red</li>
        <li>green</li>
        <li>blue</li>
        <li>YELLOW!</li>
    </ul>
</body>`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
