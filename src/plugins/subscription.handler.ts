import {Observable, Subscription} from "rxjs";
import {tap} from "rxjs/operators";
import {InstanceHandlerInterface} from "../interfaces/instance-handler.interface";

export const subscriptionHandler: InstanceHandlerInterface = {
    instance: Subscription,
    handler: (result: Subscription, cb) => {
        return result.add(cb);
    }
};
