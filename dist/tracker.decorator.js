"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const tracker_callback_1 = require("./tracker-callback");
function Tracker(options) {
    return (target, propertyKey, descriptor) => {
        var _a;
        const origMethod = descriptor.value;
        const timerName = ((_a = options) === null || _a === void 0 ? void 0 : _a.name) || target.constructor.name + '>' + propertyKey.toString();
        descriptor.value = function (...args) {
            const start = Date.now();
            const result = origMethod.apply(this, args);
            if (result instanceof Promise) {
                return result
                    .then(data => {
                    track(tracker_callback_1.trackerCallback, timerName, Date.now() - start, args, data);
                    return data;
                });
            }
            else {
                track(tracker_callback_1.trackerCallback, timerName, Date.now() - start, args, result);
                return result;
            }
        };
        Object.defineProperty(descriptor.value, 'name', { value: propertyKey, writable: false });
        copyMethodMetadata(origMethod, descriptor.value);
        return descriptor;
    };
}
exports.Tracker = Tracker;
function track(cb, ...args) {
    try {
        cb(...args);
    }
    catch (e) {
        console.error('tracker callback error', e);
    }
}
function copyMethodMetadata(src, target) {
    const metadataKeys = Reflect.getOwnMetadataKeys(src);
    for (let i = 0; i < metadataKeys.length; i++) {
        const metaKey = metadataKeys[i];
        const metaVal = Reflect.getOwnMetadata(metaKey, src);
        Reflect.defineMetadata(metaKey, metaVal, target);
    }
}
