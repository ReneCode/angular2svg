import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SvgElementComponent } from './svg-element/svg-element.component';
import { PanZoomComponent } from './pan-zoom/pan-zoom.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgElementComponent,
    PanZoomComponent
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
