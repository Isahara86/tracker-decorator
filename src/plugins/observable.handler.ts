import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {InstanceHandlerInterface} from "../interfaces/instance-handler.interface";

export const observableHandler: InstanceHandlerInterface = {
    instance: Observable,
    handler: (result: Observable<unknown>, cb) => {
        return result.pipe(tap(cb, cb))
    }
};
