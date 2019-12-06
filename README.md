## Agenda

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

## Description
- [Example](#example)
- [Supported features](#supported-features)
    - [Custom metrics callback](#custom-tracker-callback)
    - [Specify custom metric name](#custom-metric-name)

<a name="example"></a>
## Example

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
<a name="supported-features"></a>
## Supported features


<a name="custom-tracker-callback"></a>
### Set custom metrics callback
```typescript
import { setTimerCallback } from 'tracker-decorator/dist';

setTimerCallback((name, time)=>{
    console.log(name, time);
});
```
<a name="custom-metric-name"></a>
### Specify custom metric name 

```typescript
@TimeTracker({name: 'my-metric'})
```
