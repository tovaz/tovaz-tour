import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SanitizeHtmlPipe } from './sanitizeHtml.pipe';
import { TovazTourComponent } from './tovaz-tour.component';
import { IonicModule } from '@ionic/angular';


@NgModule({
  declarations: [SanitizeHtmlPipe, TovazTourComponent],
  imports: [
    IonicModule.forRoot(),
    CommonModule
  ],
  exports: [TovazTourComponent]
})
export class TovazTourModule { }
