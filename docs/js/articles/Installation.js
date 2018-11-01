Articles.define('Installation', Macro => [
    {
        tag: 'p',
        html: `<b>Elements</b> is a utility library that aims to make using native
        browser technologies easier. It is not a custom UI framework. As a result,
        it can be easily integrated to work alongside other libraries and it does
        not require you to establish a toolchain: no command line interfaces, no
        build tools. All you have to do is:`
    },
    {
        tag: 'ol',
        children: [
            {
                tag: 'li',
                html: 'Download the <a href="elements.min.js" download="elements.min.js">JavaScript file</a>.'
            },
            {
                tag: 'li',
                html: `Reference the file from a ${Macro.SCRIPT} element in your document.`
            }
        ]
    },
    {
        tag: 'pre',
        child: {
            tag: 'code',
            text: '<script type="application/javascript" src="elements.min.js"></script>'
        }
    }
]);
