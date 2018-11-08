Articles.define('attributes', Macro => [
    {
        tag: 'p',
        html: `Assigns attribute values to the resulting ${Macro.HTML_ELEMENT}.
        Note that while it is true, that simply adding attributes to the <b>options</b>
        ${Macro.OBJECT} for the ${Macro.ELEMENTS_CREATE} function will work (as long
        as the attribute name does not clash with option names), when assigning
        multiple attributes it is more efficient to use the <b>attributes</b> option. There
        is also a shorthand version of this option, called ${Macro.ATTS}, which uses
        the same underlying implementation, hence it behaves identically.`
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Value' },
            {
                tag: 'p',
                html: `${Macro.OBJECT} that maps attribute names to values. This object
                can be thought of as a <dfn>{ string => string }</dfn> map. The object
                property keys correspond to attribute names, and the property values
                correspond to attribute values.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates two ${Macro.INPUT} instances using
                slightly different approaches. Note that in both cases we get identical
                results, however the <b>Elements</b> library uses a slightly different process
                to achieve said results. In the first case, <i>id</i> is assigned using the
                ${Macro.ID} option processor function because there happens to be an option
                called "id". Both <i>type</i> and <i>placeholder</i>, in the first case, are assigned as basic
                attributes through the process of elimination, described in ${Macro.ELEMENTS_CREATE}
                documentation: if it is not a <b>tag</b> option, and its name does not match any
                pre-defined options, and the ${Macro.PROTOTYPE} of the ${Macro.HTML_ELEMENT} does not
                define a setter method with the same name, then it must be a basic attribute. In the second
                case, all three attributes are defined inside the value for the <b>attributes</b>
                option, so they are all assigned as basic attributes. Note that in this case, the library
                does not need to go through the process of elimination for every attribute, hence the code
                executes a tiny bit faster. This optimization can be made because the second case
                does a better job of conveying the intention to assign attributes. Also note that
                the <b>attributes</b> option allows you to sidestep pre-defined option processors
                and assigned attributes with the same names as existing options. In the second case, this example assigns
                the <i>id</i> as a basic attribute without invoking the pre-defined ${Macro.ID}
                option processor function, whereas in the first case, said function is invoked.`
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
    tag: 'input',
    id: 'my-id',
    type: 'password',
    placeholder: 'Enter password...'
});

Elements.create({
    tag: 'input',
    attributes: {
        id: 'my-id',
        type: 'password',
        placeholder: 'Enter password...'
    }
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
`<input id="my-id" type="password" placeholder="Enter password..." />
<input id="my-id" type="password" placeholder="Enter password..." />`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
