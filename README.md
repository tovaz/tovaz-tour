# Tovaz Guide Tour

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.5.

## To install use
```sh 
npm install tovaz-tour
```

## Import the module in your app.module
```js
import { TovazTourModule } from 'projects/tovaz-tour/src/public-api';
```

# How to create a tour

## You have to use the service called TovazService
The service receive an array of StepOptions and return an observable which is called everytime that new step is displayed.
```js let steps: StepOptions = [];
this.tourService.start( steps ).subscribe( (step:any) => {
  console.log('CURRENT STEP', step);
});
```

## Step and Tour Interfaces
```js
export interface TourOptions {
  name, 
  skipped?: false, 
  ended?: false
}
  
export interface StepOptions {
  dom,      
  title, 
  content,  
  image?, 
  tour?,
  position?, 
  delay?, 
  isStart?
}
```

### Dont forget to add in app.component.html the component tag
```html 
<tovaz-tour></tovaz-tour>
```
