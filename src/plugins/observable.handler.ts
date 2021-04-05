import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {InstanceHandlerInterface} from "../interfaces/instance-handler.interface";

export const observableHandler: InstanceHandlerInterface = {
        instance: Observable,
        handler: (dataIn: any, result: Observable<unknown>, timerName: string) => {
            return new Promise((resolve) => {
                result.pipe(
                    tap(resolve, resolve)
                )
            })
        }
    };
