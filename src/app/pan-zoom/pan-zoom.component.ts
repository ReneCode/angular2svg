import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: '[app-pan-zoom]',
  templateUrl: './pan-zoom.component.html',
  styleUrls: ['./pan-zoom.component.css']
})
export class PanZoomComponent implements OnInit {
  @Output() onPanZoom : EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  panZoom(cmd) {
    this.onPanZoom.emit(cmd);
  }

}
