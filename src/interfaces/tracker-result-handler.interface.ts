export interface TrackerResultHandlerInterface {
    (result: any, cb: (result: unknown) => void): Promise<unknown> | unknown;
}
