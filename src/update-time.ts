export const metrics: any = {};

export function updateTime(name: string, time: number, dataIn: any, dataOut: any): void {
    if (!metrics[name]) {
        metrics[name] = {
            counter: 0,
            minTime: 0,
            avgTime: 0,
            maxTime: 0,
        };
    }

    const timer = metrics[name];

    timer.avgTime = (timer.avgTime * timer.counter + time) / (timer.counter + 1);

    if (timer.minTime > time || !timer.minTime) {
        timer.minTime = time;
    }

    if (timer.maxTime < time) {
        timer.maxTime = time;
    }

    timer.counter++;

}
