import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { SvgText } from '../../models/svg-text';
import { SvgItem } from '../../models/svg-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public transform = {
    tx: 0,
    ty: 0,
    sc: 1.0
  };

  startX;
  startY;
  lastElementId: number = 0;
  dragging = false;
  svgElements: SvgItem[] = [];
  public bOn: boolean = true;
  private lasttDraggingPoint;
  statusText = '-status-';
  svg: SVGElement;
  svgUrl: string = "https://cs2-projectviewerservice-dev.azurewebsites.net/api/v1/750057417/svg/1.svg";

  constructor(private http: Http) { }

  public ngOnInit() {
    let text = new SvgText('hallo - 1234567890 abcdefghijkl', 100, 50);
    this.appendElement(text);
  }


  private appendElement(element: SvgItem): SvgItem {
    this.lastElementId++;
    element.id = this.lastElementId;
    this.svgElements.push(element);
    return element;
  }

  public addText() {
    let text: SvgText = new SvgText('a-first-line\nb-second-line\nc-last-line', 200, 100);
    // text.selected = true;
    this.appendElement(text);
  }

  public deleteText() {
    // delete all elements, that are selected
    this.selectedSvgElements().forEach(e => {
      // get the index to delete
      const delIndex = this.svgElements.indexOf(e);
      if (delIndex >= 0) {
        // delete that element
        this.svgElements.splice(delIndex, 1);
      }
    });
  }

  public mouseMove(event) {
    let pt = this.getSVGPoint(event);
    this.statusText = pt.x + '/' + pt.y;

    if (this.dragging) {
      let deltaX = pt.x - this.lasttDraggingPoint.x;
      let deltaY = pt.y - this.lasttDraggingPoint.y;
      this.lasttDraggingPoint = pt;

      // let delta = this.untransformedPoint( {x: deltaX, y: deltaY });
      // deltaX = delta.x;
      // deltaY = delta.y;

      this.selectedSvgElements()
        .forEach(e => {
          e.x += deltaX;
          e.y += deltaY;
          e.bbox = undefined;
        });
    }
  }


  private untransformedPoint(pt) {
    return {
      x: (pt.x - this.transform.tx) / this.transform.sc,
      y: (pt.y - this.transform.ty) / this.transform.sc
    }
  }

  private zoom(pt, scale) {
    pt = this.untransformedPoint(pt);

    let deltaScale = scale - this.transform.sc;
    this.transform.sc = scale;
    this.transform.tx -= deltaScale * pt.x;
    this.transform.ty -= deltaScale * pt.y;
  }


  public mouseWheelUp(event) {
    let scale = this.transform.sc * 0.98;
    let pt = this.getSVGPoint(event);
    this.zoom(pt, scale);
  }

  public mouseWheelDown(event) {
    let scale = this.transform.sc * 1.02;
    let pt = this.getSVGPoint(event);
    this.zoom(pt, scale);
  }

  public get items() {
    console.log("get items");
    return [1, 2, 3, 4];
  }

  private selectedSvgElements(): any[] {
    return this.svgElements.filter(e => e.selected === true);
  }


  private getSVGPoint(event) {
    let svg = document.querySelector('svg');
    let pt = svg.createSVGPoint();

    pt.x = event.clientX;
    pt.y = event.clientY;
    pt = pt.matrixTransform(svg.getScreenCTM().inverse());
    return { x: pt.x, y:pt.y };
  }

  private getPoint(event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }


  private getSVGElementById(id) {
    return this.svgElements.find(e => e.id === id);
  }

  public mouseDown(event) {
    let pt = this.getPoint(event);

    let element = document.elementFromPoint(pt.x, pt.y);
    if (element && element !== document.documentElement) {
      let id = parseInt(element.getAttribute('id'));
      let svgElement = this.getSVGElementById(id);
      if (svgElement) {
        svgElement.selected = true;
        this.dragging = true;
        this.lasttDraggingPoint = this.getSVGPoint(event);
      } else {
        this.svgElements.forEach(e => e.selected = false);
      }
    }
  }

  public mouseUp(event) {
    this.dragging = false;
  }

  // private mouseMove(event) {
  //   if (this.dragging) {
  //     this.transform.tx += event.clientX - this.startX;
  //     this.transform.ty += event.clientY - this.startY;

  //     this.startX = event.clientX;
  //     this.startY = event.clientY;

  //     this.updateTransform();
  //   }
  // }

  // private mouseUp(event) {
  //   this.dragging = false;;
  // }

  // private mouseDown(event) {
  //   this.startX = event.clientX;
  //   this.startY = event.clientY;
  //   this.dragging = true;
  // }

}
