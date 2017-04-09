import { Component } from '@angular/core';
import { SvgText } from '../../models/svg-text'
import { SvgItem } from '../../models/svg-item'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public transform = {
    text: '',
    tx: 0,
    ty: 0,
    sc: 1.0
  };

  startX;
  startY;
  lastElementId: number = 0;
  dragging = false;
  svgElements: SvgItem[] = [];
  private lasttDraggingPoint;
  statusText = "-ready-";

  public ngOnInit() {
    console.log("init");

    let text = new SvgText('hallo', 30, 150);
    this.appendElement(text);

    this.updateTransform();
  }


  private updateTransform() {
    this.transform.text =
      `translate(${this.transform.tx},${this.transform.ty})scale(${this.transform.sc})`;
    console.log(this.transform.text);
  }

  public panZoom(cmd: String) {
    switch (cmd) {
      case 'left':
        this.transform.tx += 50;
        break;
      case 'right':
        this.transform.tx -= 50;
        break;
      case 'up':
        this.transform.ty += 50;
        break;
      case 'down':
        this.transform.ty -= 50;
        break;
      case '+':
        this.transform.sc *= 1.1;
        break;
      case '-':
        this.transform.sc *= 0.9;
        break;
    }
    this.updateTransform();
  }


  private appendElement(element: SvgItem): SvgItem {
    this.lastElementId++;
    element.index = this.lastElementId;
    this.svgElements.push(element);
    return element;
  }

  public addText() {
    let text = this.appendElement(new SvgText("text", 200, 100));
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
    if (this.dragging) {

      let pt = this.getSVGPoint(event);
      // var ele = document.querySelector(':hover');
      this.statusText = pt.x + "/" + pt.y;

      let deltaX = pt.x - this.lasttDraggingPoint.x;
      let deltaY = pt.y - this.lasttDraggingPoint.y;
      this.lasttDraggingPoint = pt;

      this.selectedSvgElements()
        .forEach(e => {
          e.x += deltaX;
          e.y += deltaY;
        });
    }

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
    return pt;
  }

  private getPoint(event) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }


  private getSVGElementByIndex(index) {
    return this.svgElements.find(e => e.index === index);
  }

  public mouseDown(event) {
    let pt = this.getPoint(event);

    let element = document.elementFromPoint(pt.x, pt.y);
    if (element && element !== document.documentElement) {
      let index = parseInt(element.getAttribute("index"));
      let svgElement = this.getSVGElementByIndex(index);
      if (svgElement) {
        svgElement.selected = true;
        this.dragging = true;
        this.lasttDraggingPoint = this.getSVGPoint(event);
      } else {
        this.svgElements.forEach(e => e.selected = false);
      }

      // this.statusText = element;
      // }
      // elements.push(element);
      // old_visibility.push(element.style.visibility);
      // element.style.visibility = 'hidden'; // Temporarily hide the element (without changing the layout)
    }
    // for (var k = 0; k < elements.length; k++) {
    //   elements[k].style.visibility = old_visibility[k];
    // }
    // elements.reverse();
    // return elements;
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
