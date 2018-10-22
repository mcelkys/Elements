Articles.define('Elements.removeAllChildren()', Macro => [
    {
        tag: 'p',
        html: `Removes all child ${Macro.NODE} instances from the reference ${Macro.NODE}. This utility
        function should only be used when it is important to keep the parent connected to the DOM. In any other
        case, it is more efficient to remove the parent node itself, rather than empty it out. Removing all
        children from a parent node causes a new DOM transformation with every child removed, where as removing
        the parent node itselt can be processed in one go.`
    }
]);
