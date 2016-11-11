import { Component, Input } from '@angular/core';

@Component({
  selector: '[app-svg-element]',
  templateUrl: './svg-element.component.html',
  styleUrls: ['./svg-element.component.css']
})
export class SvgElementComponent  {
  @Input() element;


}
