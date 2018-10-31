Articles.define('Fragments.from()', Macro => [
    {
        tag: 'p',
        html: `Creates a new ${Macro.DOCUMENT_FRAGMENT} instance from an ${Macro.ARRAY} of
        ${Macro.NODE} instances.`
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Parameters' },
            {
                tag: 'dl',
                children: [
                    { tag: 'dt', text: 'nodes' },
                    {
                        tag: 'dd',
                        child: {
                            tag: 'p',
                            html: `(Required) ${Macro.ARRAY} of ${Macro.NODE} instances, that will be contained within
                            resulting ${Macro.DOCUMENT_FRAGMENT}.`
                        }
                    }
                ]
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Returns' },
            { tag: 'p', html: `A new ${Macro.DOCUMENT_FRAGMENT} instance.` }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates three ${Macro.HTML_ELEMENT} instances and adds them to
                an ${Macro.ARRAY}. The resulting array is then converted into a ${Macro.DOCUMENT_FRAGMENT}, which is
                then appended to the ${Macro.BODY}.`
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
`const div = Elements.create({ class: 'class-selector' });
const iframe = Elements.create({ tag: 'iframe', src: 'protocol://domain/' });
const p = Elements.create({ tag: 'p', text: 'Lorem ipsum...' });
const array = Array.of(div, iframe, p);
const fragment = Fragments.from(array);
document.body.appendChild(fragment);`
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
`<body>
    <div class="class-selector"></div>
    <iframe src="protocol://domain/"></iframe>
    <p>Lorem ipsum...</p>
</body>`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
