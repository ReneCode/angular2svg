import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './components/app/app.component';
import { SvgElementComponent } from './directives/svg-element/svg-element.component';
import { PanZoomComponent } from './directives/pan-zoom/pan-zoom.component';
import { SvgEplanComponent } from './directives/svg-eplan/svg-eplan.component';
import { SvgTransformDirective } from './directives/svg-transform/svg-transform.directive';
import { SvgTextComponent } from './components/svg-text/svg-text.component';
import { SvgItemComponent } from './components/svg-item/svg-item.component';

import { MouseWheelDirective } from './directives/mouse-wheel.directive';


@NgModule({
  declarations: [
    AppComponent,
    SvgElementComponent,
    PanZoomComponent,
    SvgEplanComponent,
    SvgTextComponent,
    SvgTransformDirective,
    MouseWheelDirective,
    SvgItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
