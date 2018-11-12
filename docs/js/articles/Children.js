Articles.define('children', Macro => [
    {
        tag: 'p',
        html: `Creates child ${Macro.HTML_ELEMENT} instances and appends them to
        the resulting ${Macro.HTML_ELEMENT} in the order they are defined.`
    }
]);
