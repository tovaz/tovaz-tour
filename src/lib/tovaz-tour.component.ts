import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { StepOptions } from './interfaces';
import { TovazTourService } from './tovaz-tour.service';

@Component({
  selector: 'tovaz-tour',
  templateUrl: './tovaz-tour.component.html',
  styleUrls: ['./tovaz-tour.component.scss'],
})
export class TovazTourComponent implements OnInit, AfterViewInit {

  holePadding = { top: 0, bottom: 0, left: 0, right: 0 };
  cardSize = { width: 300, height: 'auto' };
  screen = { width: 0, height: 0};
  step: StepOptions = null;
  isVisible = false;
  maxSteps = 0;
  stepIndex = 0;
  smallScale = 1;
 
  @ViewChild('hole', {static: true}) hole: ElementRef; //_ hole xD :) :)-
  @ViewChild('tourcard', {static: true}) card: ElementRef;

  constructor(private renderer: Renderer2, private tourService: TovazTourService) { }

  ngAfterViewInit(){
    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;
    this.onResize({ target: { innerWidth: this.screen.width, innerHeight: this.screen.height}});
  }

  ngOnInit() {
    this.tourService._showStep.subscribe( step => {
      this.maxSteps = this.tourService.maxSteps;
      this.stepIndex = this.tourService.stepIndex;      
      this.isVisible = true;
      this.showStep(step);
    });

    this.tourService._end.subscribe( value => this.isVisible = false );
  }

  getPosition(el) {
    let rect = el.getBoundingClientRect();
    let docEl = document.documentElement;

    let rectTop = rect.top + window.pageYOffset - docEl.clientTop;
    let rectLeft = rect.left + window.pageXOffset - docEl.clientLeft;
    return { top: rectTop, left: rectLeft, width: rect.width, height: rect.height };
  }

  //_ Start with delay or 0 timeout
  showStep(step){
    if (step.isStart){ //_ Show in the midle only for start tour step.
      this.step = step;
      setTimeout( ts => {
        this.moveHole({ width: 0, height: 0, top: 0, left: 0});
        this.card.nativeElement.style.top = (this.screen.height/2) - (this.card.nativeElement.offsetHeight/2) + 'px';
        this.card.nativeElement.style.left = (this.screen.width/2) - (this.card.nativeElement.offsetWidth/2) + 'px';
      }, 100);
    }
    else {
      setTimeout( ts => {
        this.step = step;
        let el = document.querySelector(step.dom);
        
        let rect = this.getPosition(el);
        console.log('Rectangle', rect);
        setTimeout( tt => { //_ Prevent wrong location if not has setted the size before call the move functions
          this.moveHole(rect);
          this.moveCard(rect, step);
        }, 100)
        
      }, step.delay ? step.delay : 0 );
    }
  }

  moveHole(rect){
    this.hole.nativeElement.style.width = rect.width + this.holePadding.right + 'px';
    this.hole.nativeElement.style.height = rect.height + this.holePadding.bottom + 'px';
    this.hole.nativeElement.style.top = rect.top - this.holePadding.top + 'px';
    this.hole.nativeElement.style.left = rect.left - this.holePadding.left + 'px';
  }

  cardOffset = 10;
  moveCard(rect, step: StepOptions){
    let xCard = rect.left + rect.width + this.cardOffset;
    let yCard = rect.top + rect.height + this.cardOffset;// - this.cardOffset;
    if ( !this.hasSpaceRight(rect) )
      xCard = rect.left - this.card.nativeElement.offsetWidth - this.cardOffset;
    if ( !this.hasSpaceBottom(rect) )
      yCard = rect.top  - this.card.nativeElement.offsetHeight;
    if (yCard < 1) 
      yCard = rect.top;
    if (xCard < 1) //_ Fix location for small screens
      xCard = rect.left + rect.width + this.cardOffset; 
    if ((xCard + this.card.nativeElement.offsetWidth) > this.screen.width)
      xCard = this.screen.width - this.card.nativeElement.offsetWidth; //(this.screen.width/2) - (this.card.nativeElement.offsetWidth/2);
    if(yCard + this.card.nativeElement.offsetHeight > this.screen.height)
      yCard = this.screen.height - this.card.nativeElement.offsetHeight;
      
    this.card.nativeElement.style.top = (yCard*this.smallScale) + 'px';
    this.card.nativeElement.style.left = (xCard*this.smallScale) + 'px';
  }

  next(){ this.tourService.next(); }
  back(){ this.tourService.back(); }
  end(){ this.tourService.end(); }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.screen.width = event.target.innerWidth;
    this.screen.height = event.target.innerHeight;

    if (this.screen.width < 450)
      this.smallScale = 0.9;
    else
      this.smallScale = 1;
    this.card.nativeElement.style.transform = 'scale('+this.smallScale+')';

    setTimeout( r => { 
      if (this.step) 
      this.showStep(this.step) 
    }, 100);
  }

  hasSpaceRight(rect){
    return ( rect.left + rect.width + this.card.nativeElement.offsetWidth + this.cardOffset ) < this.screen.width;
  }

  hasSpaceBottom(rect){
    return ( rect.top + this.card.nativeElement.offsetHeight ) < this.screen.height;
  }
}