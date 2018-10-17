(function() {

    const HTML_ELEMENT = '<a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"><dfn>HTMLElement</dfn></a>';
    const OBJECT = '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><dfn>Object</dfn></a>';
    const PROTOTYPE = '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype">prototype</a>';
    const WEB_COMPONENTS = '<a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web Components</a>';

    Articles.set([
        {
            title: 'Elements.build()',
            render: [
                { tag: 'p', html: `Creates a new ${HTML_ELEMENT} instance, according to provided options.` },
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
                                            (Required) ${OBJECT} that contains configurations for an ${HTML_ELEMENT}.
                                            All properties assigned to this ${OBJECT} will be evaluated as follows:
                                            `
                                        },
                                        {
                                            tag: 'ol',
                                            children: [
                                                {
                                                    tag: 'li',
                                                    html: `Base ${HTML_ELEMENT} is created using the <b>tag</b> option. This is the only special case. It occurs
                                                    before any of the other options are processed and does not participate in further attribute assignment.`
                                                },
                                                {
                                                    tag: 'li',
                                                    html: 'Matched againts pre-defined <b>processor</b> functions (E.g. <i>class, children, nodes, listeners</i>).'
                                                },
                                                {
                                                    tag: 'li',
                                                    html: `Matched against setters methods defined on the ${PROTOTYPE} of the target element type (as specified in the <i>tag</i> option).
                                                    This is mainly useful when working with custom ${WEB_COMPONENTS}.`
                                                },
                                                {
                                                    tag: 'li',
                                                    html: 'Assigned as a basic HTML attribute (E.g. <i>href, id, class</i>).'
                                                }
                                            ]
                                        },
                                        {
                                            tag: 'p',
                                            html: `All properties are optional, including the <b>tag</b> option. However, the options ${OBJECT} itself is required.
                                            There are <b>processor</b> functions built into Elements for: <i>afterNode, appendTo, attributes, atts, beforeNode,
                                            child, children, class, html, listeners, node, nodes, on, prependTo, replaceNode, set, style, text</i>.`
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
                        { tag: 'p', html: `A new ${HTML_ELEMENT} instance.` }
                    ]
                },
                {
                    tag: 'section',
                    children: [
                        { tag: 'h3', text: 'Example' },
                        {
                            tag: 'p',
                            html: `To explore a common use case, we build three top level elements. The first element
                            contains a nested child element. Note that you can omit the <b>tag</b> option, which produces a DIV element.
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
            ],
            children: [
                {
                    title: 'afterNode'
                },
                {
                    title: 'appendTo'
                },
                {
                    title: 'attributes'
                },
                {
                    title: 'atts'
                },
                {
                    title: 'beforeNode'
                },
                {
                    title: 'child'
                },
                {
                    title: 'children'
                },
                {
                    title: 'class'
                },
                {
                    title: 'html'
                },
                {
                    title: 'listeners'
                },
                {
                    title: 'node'
                },
                {
                    title: 'nodes'
                },
                {
                    title: 'on'
                },
                {
                    title: 'prependTo'
                },
                {
                    title: 'replaceNode'
                },
                {
                    title: 'set'
                },
                {
                    title: 'style'
                },
                {
                    title: 'text'
                }
            ]
        },
        {
            title: 'Elements.buildFragment()'
        },
        {
            title: 'Elements.defineProcessor()'
        },
        {
            title: 'Elements.removeAllChildren()'
        }
    ]);

})();
