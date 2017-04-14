import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-pan-zoom]',
  templateUrl: './pan-zoom.component.html',
  styleUrls: ['./pan-zoom.component.css']
})
export class PanZoomComponent implements OnInit {
  @Output() onPanZoom: EventEmitter<string> = new EventEmitter<string>();
  @Input() svgTransform: any;

  constructor() { }

  ngOnInit() {
  }

  public panZoom(cmd: String) {
    switch (cmd) {
      case 'left':
        this.svgTransform.tx -= 50;
        break;
      case 'right':
        this.svgTransform.tx += 50;
        break;
      case 'up':
        this.svgTransform.ty -= 50;
        break;
      case 'down':
        this.svgTransform.ty += 50;
        break;
      case '+':
        this.svgTransform.sc *= 1.1;
        break;
      case '-':
        this.svgTransform.sc *= 0.9;
        break;
    }
  }

}
