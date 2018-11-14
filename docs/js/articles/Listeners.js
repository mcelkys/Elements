Articles.define('listeners', Macro => [
    {
        tag: 'p',
        html: `Assigns listener functions to the resulting ${Macro.HTML_ELEMENT}.
        Note that all listeners are assigned as <i>passive</i> (where supported),
        which means that you will not be able to invoke the ${Macro.EVENT_PREVENT_DEFAULT}
        function. This is designed to prevent DOM blocking. There is also a shorthand
        version of this option, called ${Macro.ON}.`
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Value' },
            {
                tag: 'p',
                html: `${Macro.OBJECT} that maps event types to handler functions.
                This object can be thought of as a <dfn>{ string => function }</dfn> map.
                The object property keys correspond to event types, and the property
                values correspond to handler functions.`
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `The following example creates a ${Macro.BUTTON} with a
                <i>click</i> event listener. It then call the <i>click</i> method
                on the button to create a click event, which invokes said listener.`
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
`const button = Elements.create({
    tag: 'button',
    listeners: {
        click: event => {
            console.log('Button was clicked!');
        }
    }
});
button.click();`
                            }
                        ]
                    },
                    {
                        tag: 'pre',
                        children: [
                            { tag: 'h4', text: 'Console output' },
                            {
                                tag: 'samp',
                                text: 'Button was clicked!'
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
