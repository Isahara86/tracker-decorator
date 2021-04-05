export interface TrackerResultHandlerInterface {
    (dataIn: any, result: any, timerName: string): Promise<unknown> | unknown;
}
