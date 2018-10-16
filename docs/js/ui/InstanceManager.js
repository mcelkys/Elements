const InstanceManager = (function() {
    const managers = new Map;
    const references = new Map;
    var gcid;

    function performGarbageCollection() {
        const body = document.body;
        for (let node of references.keys()) {
            if (!body.contains(node)) {
                references.get(node)();
                references.delete(node);
            }
        }
    }

    return {

        get: managers.get.bind(managers),

        forUnbound(template) {
            var instance;
            const manager = Object.freeze({

                register(rootNode, inst) {
                    instance = inst;
                    references.set(rootNode, manager.clean.bind(manager, inst));
                },

                get: () => instance,

                has: () => !!instance,

                all: () => [instance],

                clean(inst) {
                    if (instance === inst)
                        instance = null;
                }

            });
            managers.set(template, manager);
        },

        forStrictlyBound(template) {
            const instances = new Map;
            const manager = Object.freeze({

                register(rootNode, key, instance) {
                    let all = instances.set(key, instance);
                    references.set(rootNode, manager.clean.bind(manager, key, instance));
                },

                get: instances.get.bind(instances),

                has: instances.has.bind(instances),

                all: () => Array.from(instances.values()),

                clean(key, instance) {
                    const existing = instances.get(key);
                    if (existing === instance)
                        instances.delete(key);
                }

            });
            managers.set(template, manager);
        },

        forLooselyBound(template) {
            const instances = new Map;
            const manager = Object.freeze({

                register(rootNode, key, instance) {
                    let all = instances.get(key);
                    if (!all) {
                        all = [];
                        instances.set(key, all);
                    }
                    all.push(instance);
                    references.set(rootNode, manager.clean.bind(manager, key, instance));
                },

                get: instances.get.bind(instances),

                has: instances.has.bind(instances),

                all: () => Array.from(instances.values()).reduce((all, some) => all.concat(some), []),

                clean(key, instance) {
                    const all = instances.get(key);
                    if (all) {
                        const index = all.indexOf(instance);
                        if (index >= 0) all.splice(index, 1);
                        if (all.length === 0) instances.delete(key);
                    }
                }

            });
            managers.set(template, manager);
        },

        scheduleGarbageCollection() {
            clearTimeout(gcid);
            gcid = setTimeout(performGarbageCollection, 3000);
        }

    };
})();
