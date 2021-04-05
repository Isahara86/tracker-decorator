import 'reflect-metadata';
import {trackerCallback} from './tracker-callback';
import {TrackerDecoratorOptions} from './interfaces/tracker-decorator-options.interface';
import {instanceHandlerStorage} from "./handler-storage";
import {TrackerResultHandlerInterface} from "./interfaces/tracker-result-handler.interface";

// TODO check precisely if it works for all cases. Before "copyMetadata()" it broke some logic like @Get @Pose @swagger-ui
export function Tracker(options?: TrackerDecoratorOptions): MethodDecorator {

    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const origMethod = descriptor.value;
        const timerName = options?.name || target.constructor.name + '>' + propertyKey.toString();

        descriptor.value = function (...args: any[]): unknown {

            const start = Date.now();

            let result = origMethod.apply(this, args);
            const customHandler = getResultHandler(result);

            if (customHandler) {
                return customHandler(
                    result,
                    resp => track(trackerCallback, timerName, Date.now() - start, args, resp),
                );
            } else if (result instanceof Promise) {
                return result
                    .then(
                        data => {
                            track(trackerCallback, timerName, Date.now() - start, args, data);
                            return data;
                        },
                        err => {
                            track(trackerCallback, timerName, Date.now() - start, args, err);
                            return Promise.reject(err);
                        }
                    );

            } else {
                track(trackerCallback, timerName, Date.now() - start, args, result);
                return result;
            }

        };

        //  copy method name
        Object.defineProperty(descriptor.value, 'name', {value: propertyKey, writable: false});
        copyMethodMetadata(origMethod, descriptor.value);

        return descriptor;

    };

}

function getResultHandler(result: unknown): TrackerResultHandlerInterface | undefined {
    return instanceHandlerStorage
        .find(h => (result instanceof h.instance))?.handler;
}

function track(cb: Function, ...args: any[]): void {
    try {
        cb(...args);
    } catch (e) {
        console.error('tracker callback error', e);
    }
}

function copyMethodMetadata<T = () => any>(src: T, target: T): void {
    const metadataKeys = Reflect.getOwnMetadataKeys(src);
    for (let i = 0; i < metadataKeys.length; i++) {
        const metaKey = metadataKeys[i];
        const metaVal = Reflect.getOwnMetadata(metaKey, src);
        Reflect.defineMetadata(metaKey, metaVal, target);
    }
}
