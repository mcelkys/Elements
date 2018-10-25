Articles.define('Sandbox', Macro => {
    var output = Elements.create({ tag: 'iframe', class: 'flexing' });
    var lib, timeoutId;
    const styleEditor = Elements.create({
        class: 'flexing padded editor',
        contentEditable: 'true',
        text: '/* Declare your CSS here... */',
        on: { keyup: onKeyUp }
    });
    const scriptEditor = Elements.create({
        class: 'flexing padded editor',
        contentEditable: 'true',
        text: '/* Use JavaScript and Elements libary here... */',
        on: { keyup: onKeyUp }
    });
    const horizontalResizer = Elements.create({
        class: 'resizer',
        style: { cursor: 'row-resize' }
    });
    const inputContainer = Elements.create({
        class: 'flexed column',
        style: { flex: '1' },
        nodes: [ styleEditor, horizontalResizer, scriptEditor ]
    });
    const outputContainer = Elements.create({
        class: 'flexed',
        style: { flex: '1' },
        node: output
    });
     const verticalResizer = Elements.create({
         class: 'resizer',
         style: { cursor: 'col-resize' },
         // on: {
         //     mousedown: e => {
         //         const unitWidth = (verticalResizer.parentElement.clientWidth - verticalResizer.clientWidth) / 2;
         //         const unitX = verticalResizer.parentElement.offsetLeft + unitWidth;
         //         debugger;
         //         const handler = event => {
         //             const stepX = event.movementX;
         //             inputContainer.style.setProperty('flex', ((inputContainer.clientWidth - stepX) / unitWidth).toString());
         //             outputContainer.style.setProperty('flex', ((outputContainer.clientWidth - stepX) / unitWidth).toString());
         //         };
         //         verticalResizer.addEventListener('mousemove', handler, { passive: true });
         //         verticalResizer.addEventListener('mouseup', () => {
         //             verticalResizer.removeEventListener('mousemove', handler);
         //         }, { passive: true, once: true });
         //     }
         // }
     });

    fetch('elements.min.js').then(r => r.text()).then(code => {
        lib = code;
    });

    function onKeyUp(event) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(render, 1000);
        output.classList.add('update-pending');
    }

    function render() {
        output = Elements.create({
            tag: 'iframe',
            class: 'flexing',
            replaceNode: output
        });
        const fragment = Fragments.create([
            { tag: 'style', text: styleEditor.textContent },
            { tag: 'script', text: lib },
            { tag: 'script', text: scriptEditor.textContent }
        ]);
        output.contentWindow.addEventListener('error', event => {
            Elements.removeChildren(output.contentDocument.body);
            Elements.create({
                tag: 'pre',
                style: { margin: '10px' },
                child: { tag: 'samp', text: event.error.stack },
                appendTo: output.contentDocument.body
            });
        }, { passive: true });
        output.contentDocument.head.appendChild(fragment);
    }

    return { class: 'flexing flexed', nodes: [ inputContainer, verticalResizer, outputContainer ] };
});
