"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_time_1 = require("./update-time");
exports.timerCallback = update_time_1.updateTime;
function setTimerCallback(cb) {
    exports.timerCallback = cb;
}
exports.setTimerCallback = setTimerCallback;
