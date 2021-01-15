export interface TimerCallbackInterface {
    (timerName: string, time: number, dataIn: any, dataOut: any): void;
}
