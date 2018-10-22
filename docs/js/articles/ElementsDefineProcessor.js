Articles.define('Elements.defineProcessor()', Macro => [
    {
        tag: 'p',
        html: `Registers a new (or overrides an existing) <b>processor</b> function under the provided name. Said function
        can used in the ${Macro.ELEMENTS_BUILD} and ${Macro.ELEMENTS_BUILD_FRAGMENT} functions as an <b>option</b>. <i>Elements</i> comes with a variety of pre-build
        processor functions (e.g. <i>${Macro.NODE_}, ${Macro.ATTS}, ${Macro.ON}</i>), however if you wish to extend the functionality of this library, you can define new options.`
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Parameters' },
            {
                tag: 'dl',
                children: [
                    { tag: 'dt', text: 'optionName'},
                    {
                        tag: 'dd',
                        child: {
                            tag: 'p',
                            html: `(Required) ${Macro.STRING} used as an identifier for a build <b>option</b>. Option names are case sensitive.`
                        }
                    },
                    { tag: 'dt', text: 'processorFunction' },
                    {
                        tag: 'dd',
                        children: [
                            {
                                tag: 'p',
                                html: `(Required) <b>Processor</b> ${Macro.FUNCTION} that implements custom behaviour. Processor functions
                                should aim to serve a single purpose, only affect the state of the supplied ${Macro.HTML_ELEMENT}
                                and have no side-effects. They should not start any asynchronous operations. Any value returned from the function
                                will be ignored (i.e. it should return ${Macro.UNDEFINED}). When invoked the function will be supplied with two arguments:`
                            },
                            {
                                tag: 'ul',
                                children: [
                                    {
                                        tag: 'li',
                                        html: `${Macro.HTML_ELEMENT} instance that is under construction.`
                                    },
                                    {
                                        tag: 'li',
                                        html: `The value provided with <b>options</b> ${Macro.OBJECT} when ${Macro.ELEMENTS_BUILD} or
                                        ${Macro.ELEMENTS_BUILD_FRAGMENT} functions are invoked. This value may be of any type.`
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Returns' },
            { tag: 'p', html: Macro.UNDEFINED }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `This example defines <i>height</i> <b>processor</b> function that sets the height of the
                ${Macro.HTML_ELEMENT} in pixels. It then a ${Macro.DIV} element with 200 pixel height.`
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
`Elements.defineProcessor('height', function(htmlElement, pixelNumber) {
    htmlElement.style.setProperty('height', pixelNumber + 'px');
});

Elements.build({ height: 200 });`
                            }
                        ]
                    },
                    {
                        tag: 'pre',
                        children: [
                            { tag: 'h4', text: 'HTML' },
                            {
                                tag: 'code',
                                text: '<div style="height: 200px"></div>'
                            }
                        ]
                    }
                ]
            },
            {
                tag: 'p',
                html: `The following example defines a custom <i>onClick</i> <b>option</b> that adds a <i>click</i> event listener
                to an ${Macro.HTML_ELEMENT}. It then create a new ${Macro.BUTTON} element with a click listener.`
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
`Elements.defineProcessor('onClick', function(htmlElement, handlerFunction) {
    htmlElement.addEventListener('click', handlerFunction, { passive: true });
});

const button = Elements.build({
    tag: 'button',
    onClick: event => {
        console.log('Button was clicked!');
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
                                text: '> Button was clicked!'
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
