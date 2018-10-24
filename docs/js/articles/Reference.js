Articles.define('Reference', Macro => ({
    tag: 'p',
    html: `Elements library comes with two APIs: <i>Elements</i> and <i>Fragments</i>. <i>Elements</i> is
    responsible for creating and manipulating single ${Macro.HTML_ELEMENT} and ${Macro.NODE} instances,
    whereas <i>Fragments</i> creates ${Macro.DOCUMENT_FRAGMENT} instances, which are collections
    of nodes. Given that the library is primarily focused on building elements, it adopts the name of the former
    interface.`
}));
