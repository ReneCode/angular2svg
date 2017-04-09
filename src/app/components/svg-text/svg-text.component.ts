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

}
