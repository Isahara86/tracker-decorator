import { TimerCallbackInterface } from './interfaces/timer-callback.interface';
import { updateTime } from './update-time';

export let timerCallback: TimerCallbackInterface = updateTime;

export function setTimerCallback(cb: TimerCallbackInterface) {
    timerCallback = cb;
}
