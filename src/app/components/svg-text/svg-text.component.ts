import { Component, OnInit, Input } from '@angular/core';
import { SvgText } from '../../models/svg-text';



@Component({
  selector: '[app-svg-text]',
  templateUrl: './svg-text.component.html',
  styleUrls: ['./svg-text.component.css']
})
export class SvgTextComponent implements OnInit {

  @Input() public element: SvgText;

  constructor() { }

  ngOnInit() {
  }

  public get lines(): string[] {
    return this.element.text.split('\n');
  }

  public get bbox(): any {
    return {
      width: 50,
      height: 30 + 20 * (this.lines.length - 1)
    };
  }

}
