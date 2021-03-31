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

    @Tracker()
    function myFunc() {
         ... your logic ...
    }
}
```

## Description
- [Installation](#installation)
- [Example](#example)
- [Supported features](#supported-features)
    - [Custom metrics callback](#custom-tracker-callback)
    - [Specify custom metric name](#custom-metric-name)

<a name="installation"></a>
## Installation
```npm
npm install @isahara/tracker-decorator
```


<a name="example"></a>
## Example

```typescript
import { Tracker, metrics } from '@isahara/tracker-decorator';

class MyClass {
    @Tracker()
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
import { setTrackerCallback } from '@isahara/tracker-decorator';

setTrackerCallback((name, time, dataIn, dataOut)=>{
    console.log(name, time, dataIn, dataOut);
});
```
<a name="custom-metric-name"></a>
### Specify custom metric name 

By default metric name is '[ClassName] + [MethodName]'
When you need to override default you can add custom name.

```typescript
@Tracker({name: 'my-metric'})
```
