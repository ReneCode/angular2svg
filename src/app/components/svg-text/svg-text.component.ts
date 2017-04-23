import { Component, Input } from '@angular/core';
import { SvgText } from '../../models/svg-text';

@Component({
  selector: '[app-svg-text]',
  templateUrl: './svg-text.component.html',
  styleUrls: ['./svg-text.component.css']
})
export class SvgTextComponent  {

  @Input() public element: SvgText;

  constructor() { }

  public get lines(): string[] {
    return this.element.text.split('\n');
  }
}
