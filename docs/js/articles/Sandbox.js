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
        style: { cursor: 'row-resize' },
        on: {
            mousedown: e => {
                const resizer = e.target;
                const { previousSibling, nextSibling, parentElement } = resizer;
                const previousSiblingOriginHeight = previousSibling.offsetHeight;
                const nextSiblingOriginHeight = nextSibling.offsetHeight;
                const unitHeight = (previousSiblingOriginHeight + nextSiblingOriginHeight) / 2;
                const originY = resizer.offsetHeight / 2 - e.offsetY + e.pageY;
                var previousSiblingFlex = previousSiblingOriginHeight / unitHeight;
                var nextSiblingFlex = nextSiblingOriginHeight / unitHeight;
                var isMeasuring = true;
                const handler = event => {
                    const yDifference = originY - event.pageY;
                    previousSiblingFlex = (previousSiblingOriginHeight - yDifference) / unitHeight;
                    nextSiblingFlex = (nextSiblingOriginHeight + yDifference) / unitHeight;
                };
                const cleanup = () => {
                    parentElement.removeEventListener('mousemove', handler);
                    parentElement.removeEventListener('mouseup', cleanup);
                    parentElement.removeEventListener('mouseleave', cleanup);
                    isMeasuring = false;
                };
                const animateFlex = () => {
                    previousSibling.style.setProperty('flex', previousSiblingFlex.toString());
                    nextSibling.style.setProperty('flex', nextSiblingFlex.toString());
                    if (isMeasuring) requestAnimationFrame(animateFlex);
                };
                parentElement.addEventListener('mousemove', handler, { passive: true });
                parentElement.addEventListener('mouseup', cleanup, { passive: true });
                parentElement.addEventListener('mouseleave', cleanup, { passive: true });
                requestAnimationFrame(animateFlex);
            }
        }
    });
    const inputContainer = Elements.create({
        class: 'flexing flexed column',
        nodes: [ styleEditor, horizontalResizer, scriptEditor ]
    });
    const outputContainer = Elements.create({
        class: 'flexing flexed',
        node: output
    });
     const verticalResizer = Elements.create({
         class: 'resizer',
         style: { cursor: 'col-resize' },
         on: {
             mousedown: e => {
                 const resizer = e.target;
                 const { previousSibling, nextSibling, parentElement } = resizer;
                 const previousSiblingOriginWidth = previousSibling.offsetWidth;
                 const nextSiblingOriginWidth = nextSibling.offsetWidth;
                 const unitWidth = (previousSiblingOriginWidth + nextSiblingOriginWidth) / 2;
                 const originX = resizer.offsetWidth / 2 - e.offsetX + e.pageX;
                 var previousSiblingFlex = previousSiblingOriginWidth / unitWidth;
                 var nextSiblingFlex = nextSiblingOriginWidth / unitWidth;
                 var isMeasuring = true;
                 const handler = event => {
                     const xDifference = originX - event.pageX;
                     previousSiblingFlex = (previousSiblingOriginWidth - xDifference) / unitWidth;
                     nextSiblingFlex = (nextSiblingOriginWidth + xDifference) / unitWidth;
                 };
                 const cleanup = () => {
                     parentElement.removeEventListener('mousemove', handler);
                     parentElement.removeEventListener('mouseup', cleanup);
                     parentElement.removeEventListener('mouseleave', cleanup);
                     isMeasuring = false;
                 };
                 const animateFlex = () => {
                     previousSibling.style.setProperty('flex', previousSiblingFlex.toString());
                     nextSibling.style.setProperty('flex', nextSiblingFlex.toString());
                     if (isMeasuring) requestAnimationFrame(animateFlex);
                 };
                 parentElement.addEventListener('mousemove', handler, { passive: true });
                 parentElement.addEventListener('mouseup', cleanup, { passive: true });
                 parentElement.addEventListener('mouseleave', cleanup, { passive: true });
                 requestAnimationFrame(animateFlex);
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
