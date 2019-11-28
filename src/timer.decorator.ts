import 'reflect-metadata';
import { timerCallback } from './timer-callback';


// TODO check precisely if it works for all cases. Before "copyMetadata()" it broke some logic like @Get @Pose @swagger-ui
export function TimeTracker(): MethodDecorator {

    return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor): PropertyDescriptor => {
        const origMethod = descriptor.value;

        descriptor.value = function (...args: any[]): any {

            const start = Date.now();
            const timerName = this.constructor.name + '>' + propertyKey.toString();

            const result = origMethod.apply(this, args);
            if (result instanceof Promise) {
                return result
                    .then(data => {
                        timerCallback(timerName, Date.now() - start);
                        return data;
                    });

            } else {
                timerCallback(timerName, Date.now() - start);
                return result;
            }

        };

        //  copy method name
        Object.defineProperty(descriptor.value, 'name', { value: propertyKey, writable: false });
        copyMethodMetadata(origMethod, descriptor.value);

        return descriptor;

    };

}

function copyMethodMetadata<T = () => any>(src: T, target: T): void {
    const metadataKeys = Reflect.getOwnMetadataKeys(src);
    for (let i = 0; i < metadataKeys.length; i++) {
        const metaKey = metadataKeys[i];
        const metaVal = Reflect.getOwnMetadata(metaKey, src);
        Reflect.defineMetadata(metaKey, metaVal, target);
    }
}
