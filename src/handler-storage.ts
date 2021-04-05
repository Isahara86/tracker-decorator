import {InstanceHandlerInterface} from "./interfaces/instance-handler.interface";

export const instanceHandlerStorage: InstanceHandlerInterface[] = [];

// TODO consider if this required
// export const typeHandlerStorage: Array<{
//     type: "undefined" | "boolean" | "number" | "string" | "bigint" | "symbol" | "object" | "function",
//     handler: TrackerResultHandlerInterface,
// }> = [];

export const addResultHandler = (handler: InstanceHandlerInterface): void => {
    instanceHandlerStorage.push(handler);
}
