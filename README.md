### Agenda

A very simple decorator for metrics gathering.

Metrics are vital for any high load project and there are many ways to implement metrics

You can always do it like that:


```typescript
//-------- ANTI PATTERN --------//
 function myFunc() {
        const start = Date.now();
 
        ... your logic ...
        
        metrics.add('metric name', Date.now() - start); 
    }

```

Byt there is a cleaner way:

```typescript

    @TimeTracker()
    function myFunc() {
         ... your logic ...
    }
}
```



### Example

```typescript
import { TimeTracker, metrics } from 'tracker-decorator/dist';

class MyClass {
    @TimeTracker()
    method() { // if the method retuns a Promise it will work any way
        ...
    }
}

const myClassObj = new MyClass();

myClassObj.method();

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

Specify custom metric name 

```typescript
@TimeTracker({name: 'my-metric'})
```
