Articles.define('afterNode', Macro => [
    {
        tag: 'p',
        html: `Assures that the resulting ${Macro.HTML_ELEMENT} is inserted into
        the ${Macro.NODE} hierarchy as a <i>child node</i> of the <i>parent node</i>
        of the <i>reference node</i>, appearing immediately after the <i>reference
        node</i>.`
    },
    {
        tag: 'pre',
        child: {
            tag: 'code',
            text:
`<parent>
    ...
    <reference></reference>

    <!-- Your HTMLElement will be added here -->

    <other></other>
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
                will be appear immediately after this ${Macro.NODE}.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
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
                            { tag: 'h4', text: 'HTML' },
                            {
                                tag: 'code',
                                text:
`<body>
    <ul>
        <li>red</li>
        <li>green</li>
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
