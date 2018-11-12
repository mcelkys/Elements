Articles.define('children', Macro => [
    {
        tag: 'p',
        html: `Creates child ${Macro.HTML_ELEMENT} instances and appends them to
        the resulting ${Macro.HTML_ELEMENT} in the order they are defined. The
        <b>children</b> option is designed for cases, where mutliple children
        need to be created from options ${Macro.OBJECT} instances. In case you
        you only require to have a single child, it is better to use the ${Macro.CHILD}
        option.`
    },
    {
        tag: 'section',
        class: 'warning',
        children: [
            {
                tag: 'p',
                html: `While technically you can use <b>children</b> in combination
                with ${Macro.CHILD}, ${Macro.NODE_} and ${Macro.NODES}, these
                options are designed to be used separately because they all provide
                different ways of adding child nodes. Using a combination of the above
                option will produce <i>correct</i> results (i.e. all desired child
                nodes will be appended), however the results might not always be exactly
                as expected. The order in which different options get evaluated is not
                predictable, as a result nodes may be added in
                inconsistent order. In most JavaScript engine, options will be evaluated
                in the order that they were defined, however no JavaScript engine
                actually guarantees that.`
            },
            {
                tag: 'p',
                html: `Because <b>options</b> are defined in a plain ${Macro.OBJECT},
                <i>Elements</i> library internally uses a ${Macro.FORIN} loop to process
                them. For more information on why options are evaluated in arbitrary order,
                please see this <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#Description">description</a>.`
            }
        ]
    }
]);
