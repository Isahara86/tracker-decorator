"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_time_1 = require("./update-time");
exports.trackerCallback = update_time_1.updateTime;
function setTimerCallback(cb) {
    exports.trackerCallback = cb;
}
exports.setTimerCallback = setTimerCallback;
