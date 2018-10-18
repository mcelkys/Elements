(function() {

    const HTML_ELEMENT = '<a href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement"><dfn>HTMLElement</dfn></a>';
    const OBJECT = '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object"><dfn>Object</dfn></a>';
    const PROTOTYPE = '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype">prototype</a>';
    const WEB_COMPONENTS = '<a href="https://developer.mozilla.org/en-US/docs/Web/Web_Components">Web Components</a>';
    const AFTER_NODE = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDowIn19">afterNode</a>';
    const APPEND_TO = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxIn19">appendTo</a>';
    const ATTRIBUTES = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoyIn19">attributes</a>';
    const ATTS = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDozIn19">atts</a>';
    const BEFORE_NODE = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo0In19">beforeNode</a>';
    const CHILD = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo1In19">child</a>';
    const CHILDREN = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo2In19">children</a>';
    const CLASS = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo3In19">class</a>';
    const HTML = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo4In19">html</a>';
    const LISTENERS = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDo5In19">listeners</a>';
    const NODE_ = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxMCJ9fQ==">node</a>';
    const NODES = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxMSJ9fQ==">nodes</a>';
    const ON = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxMiJ9fQ==">on</a>';
    const PREPEND_TO = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxMyJ9fQ==">prependTo</a>';
    const REPLACE_NODE = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxNCJ9fQ==">replaceNode</a>';
    const SET = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxNSJ9fQ==">set</a>';
    const STYLE = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxNiJ9fQ==">style</a>';
    const TEXT = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMDoxNyJ9fQ==">text</a>';
    const DIV = '<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div"><dfn>&#60;div&#62;</dfn></a>';
    const DOCUMENT_FRAGMENT = '<a href="https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment"><dfn>DocumentFragment</dfn></a>';
    const NODE = '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Node"><dfn>Node</dfn></a>';
    const ELEMENTS_BUILD = '<a href="#eyJ0ZW1wbGF0ZSI6ImFydGljbGUiLCJwYXJhbXMiOnsia2V5IjoiMCJ9fQ=="><dfn>Elements.build()</dfn></a>';
    const ARRAY = '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"><dfn>Array</dfn></a>';
    const BODY = '<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/body"><dfn>&#60;body&#62;</dfn></a>';

    Articles.set([
        {
            title: 'Elements.build()',
            render: [
                {
                    tag: 'p',
                    html: `Creates a new ${HTML_ELEMENT} instance, according to provided options. The resuling ${HTML_ELEMENT}
                    can be appended to any ${NODE}. This is a native browser API and <b>not</b> a library specific wrapper object.`
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
                                                    html: `Matched againts pre-defined <b>processor</b> functions (E.g. <i>${CLASS}, ${CHILDREN}, ${NODES}, ${LISTENERS}</i>).`
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
                                            There are <b>processor</b> functions built into Elements for: <i>${AFTER_NODE}, ${APPEND_TO}, ${ATTRIBUTES}, ${ATTS}, ${BEFORE_NODE},
                                            ${CHILD}, ${CHILDREN}, ${CLASS}, ${HTML}, ${LISTENERS}, ${NODE_}, ${NODES}, ${ON}, ${PREPEND_TO}, ${REPLACE_NODE}, ${SET}, ${STYLE}, ${TEXT}</i>.`
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
                            contains a nested child element. Note that you can omit the <b>tag</b> option, which produces a ${DIV} element.
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
            title: 'Elements.buildFragment()',
            render: [
                {
                    tag: 'p',
                    html: `Creates a new ${DOCUMENT_FRAGMENT} instance containing an arbitrary number of ${HTML_ELEMENT} objects. A
                    fragment can be appended as a simple ${NODE} object. However, keep in mind that the fragment itself
                    will not be appendTo the DOM, but rather its contents will be transfered into the target parent ${NODE} leaving said
                    fragment empty. This function is only different from ${ELEMENTS_BUILD} in it that accepts an ${ARRAY} of option objects
                    (instead of one) and produces a ${DOCUMENT_FRAGMENT} rather than a single ${HTML_ELEMENT}.`
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
                                    child: {
                                        tag: 'p',
                                        html: `(Required) ${ARRAY} of option ${OBJECT} instances. Every instance in this ${ARRAY} must be a valid
                                        options object, that can be used with ${ELEMENTS_BUILD} function. Supplying an empty array will result in an empty
                                        ${DOCUMENT_FRAGMENT}.`
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
                        { tag: 'p', html: `A new ${DOCUMENT_FRAGMENT} instance.` }
                    ]
                },
                {
                    tag: 'section',
                    children: [
                        { tag: 'h3', text: 'Example' },
                        {
                            tag: 'p',
                            html: `The following example creates a ${DOCUMENT_FRAGMENT} containing three child elements. The contents
                            of the fragment are then transfered to the ${BODY} of the document.`
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
`const fragment = Elements.build([
    { tag: 'h1' },
    { tag: 'form' },
    { tag: 'button' }
]);

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
    <h1></h1>
    <form></form>
    <button></button>
</body>`
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
            title: 'Elements.defineProcessor()'
        },
        {
            title: 'Elements.removeAllChildren()'
        }
    ]);

})();
