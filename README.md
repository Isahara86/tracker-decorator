A very simple decorator for metrics gathering.


### Example

```typescript
import { TimeTracker, metrics } from 'tracker-decorator/dist';

class MyClass {
    @TimeTracker()
    method() {
        ...
    }
}

const myClassObj = new MyClass();

myClassObj.someMethod();

console.log(metrics);

// { 'MyClass>method':{ 
//                  counter: 75, 
//                  minTime: 53, 
//                  avgTime: 112, 
//                  maxTime: 232 
//               } 
//  }
```

Set custom tracker callback
```typescript
import { setTimerCallback } from 'tracker-decorator/dist';

setTimerCallback((name, time)=>{
    console.log(name, time);
});
```
