import { TrackerCallbackInterface } from './interfaces/tracker-callback.interface';
import { updateTime } from './update-time';

export let trackerCallback: TrackerCallbackInterface = updateTime;

export function setTimerCallback(cb: TrackerCallbackInterface) {
    trackerCallback = cb;
}
