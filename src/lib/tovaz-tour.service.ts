import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { StepOptions } from './interfaces';

@Injectable({
  providedIn: 'root'
})

export class TovazTourService {

  _currentStep = new Subject();
  _showStep = new Subject();
  _skip = new Subject();
  _end = new Subject();
  maxSteps = 0;
  stepIndex = 0;
  steps = [];
  constructor(){
    this._showStep.subscribe( step => this._currentStep.next(step) );
  }

  start(_steps : StepOptions[]){
    this.steps = _steps;
    this.maxSteps = this.steps.length-1;
    this._showStep.next(this.steps[this.stepIndex]);
    return this._currentStep; 
  }

  next(){
    if (this.stepIndex == this.steps.length-1)
      this._end.next(true);
    else{
      this.stepIndex += 1;
      this._showStep.next(this.steps[this.stepIndex]);
    }
  }

  back(){
    if (this.stepIndex == 0)
      this._end.next(true);
    else{
        this.stepIndex -= 1;
        this._showStep.next(this.steps[this.stepIndex]);
      }
  }

  end(){
    this._end.next(true);
  }

  skip() {
    this._skip.next(true);
  }
}