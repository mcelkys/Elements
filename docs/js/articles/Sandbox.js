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
         on: {
             mousedown: e => {
                 const innerMeasure = 'clientWidth';
                 const outterMeasure = 'offsetWidth';
                 const offsetAxis = 'offsetX';
                 const resizer = e.target;
                 const container = resizer.parentElement;
                 const previous = resizer.previousSibling;
                 const next = resizer.nextSibling;
                 const containerHalfDimention = container[innerMeasure] / 2;
                 const resizerMiddleCoordinate = resizer[innerMeasure] / 2;
                 var previousDimention = previous[outterMeasure];
                 var nextDimention = next[outterMeasure];
                 const handler = event => {
                     const stepDistance = (event[offsetAxis] - resizerMiddleCoordinate);
                     previousDimention += stepDistance;
                     nextDimention -= stepDistance;
                     previous.style.setProperty('flex', (previousDimention / containerHalfDimention).toString());
                     next.style.setProperty('flex', (nextDimention / containerHalfDimention).toString());
                 };
                 const cleanup = () => {
                     container.removeEventListener('mousemove', handler);
                     container.removeEventListener('mouseup', cleanup);
                     container.removeEventListener('mouseleave', cleanup);
                 };
                 container.addEventListener('mousemove', handler, { passive: true });
                 container.addEventListener('mouseup', cleanup, { passive: true });
                 container.addEventListener('mouseleave', cleanup, { passive: true });
             }
         }
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
