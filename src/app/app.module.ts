import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SvgElementComponent } from './svg-element/svg-element.component';
import { PanZoomComponent } from './pan-zoom/pan-zoom.component';
import { SvgEplanOriginalComponent } from './svg-eplan-original/svg-eplan-original.component';
import { SvgEplanModifiedComponent } from './svg-eplan-modified/svg-eplan-modified.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgElementComponent,
    PanZoomComponent,
    SvgEplanOriginalComponent,
    SvgEplanModifiedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
//  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
