import { Component, Input, AfterViewInit, DoCheck, ViewChild, ElementRef } from '@angular/core';

import { SvgItem } from '../../models/svg-item';


@Component({
  selector: '[app-svg-item]',
  templateUrl: './svg-item.component.html',
  styleUrls: ['./svg-item.component.css']
})
export class SvgItemComponent implements AfterViewInit, DoCheck {
  @Input() public element: SvgItem;

  // this is the svg-element, from whom I want the bounding box
  @ViewChild("svgGraphic") private svgGraphic: ElementRef;

  constructor() { }

  public ngAfterViewInit() {
    // get bbox once on start
    this.setBoundingBox(true);
  }

  public ngDoCheck() {
    this.setBoundingBox();
  }

  private setBoundingBox(force = false) {
    if (force || this.element.bbox === undefined) {
      let bbox = this.svgGraphic.nativeElement.getBBox();
      const margin = 5;
      bbox.x -= margin;
      bbox.width += 2 * margin;
      bbox.y -= margin;
      bbox.height += 2 * margin;
      this.element.bbox = bbox;
    }
  }
}
