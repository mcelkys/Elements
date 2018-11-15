Articles.define('replaceNode', Macro => [
    {
        tag: 'p',
        html: `Assures that the resulting ${Macro.HTML_ELEMENT} is inserted into
        the ${Macro.NODE} hierarchy as a <i>child node</i> of the <i>parent node</i>
        of the <i>reference node</i>, appearing instead of the <i>reference
        node</i>. The <i>reference node</i> will be removed from the hierarchy.`
    },
    {
        tag: 'pre',
        child: {
            tag: 'code',
            text:
`<parent>
    ...
    <other></other>
    <!-- The following node will be replaced -->
    <reference></reference>
    <other></other>
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
                will replace this ${Macro.NODE}.`
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
                then create another item, containing text "YELLOW!", replacing the
                "green" item.`
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
    afterNode: listItems[1]
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
