"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const timer_callback_1 = require("./timer-callback");
function TimeTracker() {
    return (target, propertyKey, descriptor) => {
        const origMethod = descriptor.value;
        const timerName = target.constructor.name + '>' + propertyKey.toString();
        descriptor.value = function (...args) {
            const start = Date.now();
            const result = origMethod.apply(this, args);
            if (result instanceof Promise) {
                return result
                    .then(data => {
                    timer_callback_1.timerCallback(timerName, Date.now() - start);
                    return data;
                });
            }
            else {
                timer_callback_1.timerCallback(timerName, Date.now() - start);
                return result;
            }
        };
        Object.defineProperty(descriptor.value, 'name', { value: propertyKey, writable: false });
        copyMethodMetadata(origMethod, descriptor.value);
        return descriptor;
    };
}
exports.TimeTracker = TimeTracker;
function copyMethodMetadata(src, target) {
    const metadataKeys = Reflect.getOwnMetadataKeys(src);
    for (let i = 0; i < metadataKeys.length; i++) {
        const metaKey = metadataKeys[i];
        const metaVal = Reflect.getOwnMetadata(metaKey, src);
        Reflect.defineMetadata(metaKey, metaVal, target);
    }
}
