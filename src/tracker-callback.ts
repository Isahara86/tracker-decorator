import { TrackerCallbackInterface } from './interfaces/tracker-callback.interface';
import { updateTime } from './update-time';

export let trackerCallback: TrackerCallbackInterface = updateTime;

export function setTrackerCallback(cb: TrackerCallbackInterface) {
    trackerCallback = cb;
}
