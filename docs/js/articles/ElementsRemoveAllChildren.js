Articles.define('Elements.removeChildren()', Macro => [
    {
        tag: 'p',
        html: `Removes all child ${Macro.NODE} instances from the reference ${Macro.NODE}. This utility
        function should only be used when it is important to keep the parent connected to the DOM. In any other
        case, it is more efficient to remove the parent node itself, rather than empty it out. Removing all
        children from a parent node causes a new DOM transformation with every child removed, where as removing
        the parent node itselt can be processed in one go.`
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Parameters' },
            {
                tag: 'dl',
                children: [
                    { tag: 'dt', text: 'referenceNode' },
                    {
                        tag: 'dd',
                        child: {
                            tag: 'p',
                            html: `(Required) ${Macro.NODE} from which all child ${Macro.NODE} instances will be removed.`
                        }
                    }
                ]
            },
            { tag: 'h3', text: 'Returns' },
            { tag: 'p' , html: `An ${Macro.ARRAY} containing the removed child ${Macro.NODE} instances.` }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example removes all child ${Macro.NODE} instances from the ${Macro.BODY} element.`
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
`const body = document.getElementById('body-el');
const removedNodes = Elements.removeChildren(body);`
                            }
                        ]
                    },
                    {
                        class: 'responsive',
                        children: [
                            {
                                tag: 'pre',
                                children: [
                                    { tag: 'h4', text: 'HTML Before' },
                                    {
                                        tag: 'code',
                                        text:
`<body id="body-el">
    <nav></nav>
    <form>
        <input type="text"/>
    </form>
    <button>Click me!</button>
</body>`
                                    }
                                ]
                            },
                            {
                                tag: 'pre',
                                children: [
                                    { tag: 'h4', text: 'HTML After' },
                                    {
                                        tag: 'code',
                                        text: '<body id="body-el"></body>'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
