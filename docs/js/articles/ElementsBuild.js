Articles.define('Elements.build()', Macro => [
    {
        tag: 'p',
        html: `Creates a new ${Macro.HTML_ELEMENT} instance, according to provided options. The resuling ${Macro.HTML_ELEMENT}
        can be appended to any ${Macro.NODE}. This is a native browser API and <b>not</b> a library specific wrapper object.`
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Parameters' },
            {
                tag: 'dl',
                children: [
                    { tag: 'dt', text: 'Options' },
                    {
                        tag: 'dd',
                        children: [
                            {
                                tag: 'p',
                                html: `
                                (Required) ${Macro.OBJECT} that contains configurations for an ${Macro.HTML_ELEMENT}.
                                All properties assigned to this ${Macro.OBJECT} will be evaluated as follows:
                                `
                            },
                            {
                                tag: 'ol',
                                children: [
                                    {
                                        tag: 'li',
                                        html: `Base ${Macro.HTML_ELEMENT} is created using the <b>tag</b> option. This is the only special case. It occurs
                                        before any of the other options are processed and does not participate in further attribute assignment.`
                                    },
                                    {
                                        tag: 'li',
                                        html: `Matched againts pre-defined <b>processor</b> functions (E.g. <i>${Macro.CLASS}, ${Macro.CHILDREN}, ${Macro.NODES}, ${Macro.LISTENERS}</i>).`
                                    },
                                    {
                                        tag: 'li',
                                        html: `Matched against setters methods defined on the ${Macro.PROTOTYPE} of the target element type (as specified in the <i>tag</i> option).
                                        This is mainly useful when working with custom ${Macro.WEB_COMPONENTS}.`
                                    },
                                    {
                                        tag: 'li',
                                        html: 'Assigned as a basic HTML attribute (E.g. <i>href, id, class</i>).'
                                    }
                                ]
                            },
                            {
                                tag: 'p',
                                html: `All properties are optional, including the <b>tag</b> option. However, the options ${Macro.OBJECT} itself is required.
                                There are <b>processor</b> functions built into Elements for: <i>${Macro.AFTER_NODE}, ${Macro.APPEND_TO}, ${Macro.ATTRIBUTES}, ${Macro.ATTS}, ${Macro.BEFORE_NODE},
                                ${Macro.CHILD}, ${Macro.CHILDREN}, ${Macro.CLASS}, ${Macro.HTML}, ${Macro.LISTENERS}, ${Macro.NODE_}, ${Macro.NODES}, ${Macro.ON}, ${Macro.PREPEND_TO}, ${Macro.REPLACE_NODE}, ${Macro.SET}, ${Macro.STYLE}, ${Macro.TEXT}</i>.`
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
            { tag: 'p', html: `A new ${Macro.HTML_ELEMENT} instance.` }
        ]
    },
    {
        tag: 'section',
        children: [
            { tag: 'h3', text: 'Example' },
            {
                tag: 'p',
                html: `To explore a common use case, we build three top level elements. The first element
                contains a nested child element. Note that you can omit the <b>tag</b> option, which produces a ${Macro.DIV} element.
                You may also choose to use custom attributes.`
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
`Elements.build({
    children: [
        { class: 'css-class-selector' }
    ]
});
Elements.build({
    tag: 'input',
    type: 'password'
});
Elements.build({
    tag: 'nav',
    'my-custom-attribute': 'foo'
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
`<div>
    <div class="css-class-selector"></div>
</div>
<input type="password"/>
<nav my-custom-attribute="foo"></nav>`
                            }
                        ]
                    }
                ]
            }
        ]
    }
]);
