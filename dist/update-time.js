"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.metrics = {};
function updateTime(name, time, dataIn, dataOut) {
    if (!exports.metrics[name]) {
        exports.metrics[name] = {
            counter: 0,
            minTime: 0,
            avgTime: 0,
            maxTime: 0,
        };
    }
    const timer = exports.metrics[name];
    timer.avgTime = (timer.avgTime * timer.counter + time) / (timer.counter + 1);
    if (timer.minTime > time || !timer.minTime) {
        timer.minTime = time;
    }
    if (timer.maxTime < time) {
        timer.maxTime = time;
    }
    timer.counter++;
}
exports.updateTime = updateTime;
