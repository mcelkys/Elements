Articles.define('beforeNode', Macro => [
    {
        tag: 'p',
        html: `Assures that the resulting ${Macro.HTML_ELEMENT} is inserted into
        the ${Macro.NODE} hierarchy as a <i>child node</i> of the <i>parent node</i>
        of the <i>reference node</i>, appearing just before the <i>reference
        node</i>.`
    },
    {
        tag: 'pre',
        child: {
            tag: 'code',
            text:
`<parent>
    ...
    <other></other>
    <other></other>

    <!-- Your HTMLElement will be added here -->

    <reference></reference>
    ...
</parent>`
        }
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Value' },
            {
                tag: 'p',
                html: `Reference ${Macro.NODE} instance. The resulting ${Macro.HTML_ELEMENT}
                will be appear just before this ${Macro.NODE}.`
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
                then create another item, containing text "YELLOW!", before the "green" item.`
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
const listItems = colors.map(color => Elements.create({
    tag: 'li',
    text: color
}));
Elements.create({
    tag: 'ul',
    nodes: listItems,
    appendTo: document.body
});

Elements.create({
    tag: 'li',
    text: 'YELLOW!',
    beforeNode: listItems[1]
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
        <li>YELLOW!</li>
        <li>green</li>
        <li>blue</li>
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
