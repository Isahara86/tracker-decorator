export interface TrackerCallbackInterface {
    (timerName: string, time: number, dataIn: any, dataOut: any): void;
}
