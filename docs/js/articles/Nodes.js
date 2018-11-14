Articles.define('nodes', Macro => [
    {
        tag: 'p',
        html: `Appends child ${Macro.NODE} instances in the order they were
        defined. This option is designed for cases, where mutliple ${Macro.NODE}
        isntances (ones that are ready to be appended and do not need to be built
        from <b>options</b> ${Macro.OBJECT} instances) need to be added as the
        content of the resulting ${Macro.HTML_ELEMENT}. In case you only require
        to have a single child, it is better to use the ${Macro.NODE_} option.`
    },
    {
        tag: 'section',
        class: 'warning',
        children: [
            {
                tag: 'p',
                html: `Note: ${Macro.CHILD}, ${Macro.CHILDREN}, <b>nodes</b>, ${Macro.NODE_},
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
                html: `An ${Macro.ARRAY} of ${Macro.NODE} instances that will
                be appended to the resulting ${Macro.HTML_ELEMENT}.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates an ${Macro.ARRAY} of ${Macro.LI}
                instances by mapping over and array of color values. It then creates
                a ${Macro.UL} list with the array of ${Macro.LI} nodes as its content.`
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
`const colors = ['Red', 'Green', 'Blue'];
const listItems = colors.map(color => {
    return Elements.create({
        tag: 'li',
        text: color
    });
});
Elements.create({
    tag: 'ul',
    nodes: listItems
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
`<ul>
    <li>Red</li>
    <li>Green</li>
    <li>Blue</li>
</ul>`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
