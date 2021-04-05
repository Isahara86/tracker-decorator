import {Observable, Subscription} from "rxjs";
import {tap} from "rxjs/operators";
import {InstanceHandlerInterface} from "../interfaces/instance-handler.interface";

export const subscriptionHandler: InstanceHandlerInterface = {
    instance: Subscription,
    handler: (dataIn: any, result: Subscription, timerName: string) => {
        return new Promise(resolve => result.add(resolve))
    }
};
