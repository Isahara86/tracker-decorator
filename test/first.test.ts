import {of} from "rxjs";
import {addResultHandler} from "../src";
import {observableHandler, subscriptionHandler} from "../src/plugins";
import {Tracker, setTrackerCallback} from "../src";

test('Observable handler test', (done) => {
    class TestClass {
        @Tracker()
        getObservable() {
            return of(1, 2, 3);
        }
    }

    addResultHandler(observableHandler);

    const trackerCallback = jest.fn();
    setTrackerCallback(trackerCallback);

    const testObj = new TestClass();

    testObj
        .getObservable()
        .subscribe((res) => {})
        .add(() => {
            expect(trackerCallback).toHaveBeenCalledTimes(3);
            console.log(trackerCallback.mock.calls[0])
            expect(trackerCallback.mock.calls[0][0]).toBe("TestClass>getObservable");
            done();
        });
});

test('Subscription handler test', (done) => {

    class TestClass {
        @Tracker()
        getSubscription() {
            return of(1, 2, 3).subscribe(() => {
            });
        }
    }

    addResultHandler(subscriptionHandler);

    const trackerCallback = jest.fn();
    setTrackerCallback(trackerCallback);

    const testObj = new TestClass();

    testObj
        .getSubscription()
        .add(() => {
            expect(trackerCallback).toHaveBeenCalledTimes(1);
            expect(trackerCallback.mock.calls[0][0]).toBe("TestClass>getSubscription");
            done();
        });
});

