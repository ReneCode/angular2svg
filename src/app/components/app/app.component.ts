import { Component } from '@angular/core';

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
  dragging = false;
  svgElements = [];
  private lasttDraggingPoint;
  private selectedSvgElements = [];
  statusText = "-ready-";

  public ngOnInit() {
    console.log("init");
    // this.appendElement( { type:"line", x1:30, y1:140, x2:20, y2:40} );
    this.appendElement({ type: "text", x: 30, y: 140, text: "hallo" });

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


  private appendElement(ele) {
    ele.index = this.svgElements.length;
    this.svgElements.push(ele);
  }

  public addText() {
    this.appendElement({ type: "text", x: 230, y: 40, text: "neuer text" });
  }

  public deleteText() {
    // delete all elements, that are selected
    if (this.selectedSvgElements.length > 0) {
      this.selectedSvgElements.forEach(e => {
        // get the index to delete
        const delIndex = this.svgElements.indexOf(e);
        if (delIndex >= 0) {
          // delete that element
          this.svgElements.splice(delIndex, 1);
        }
      })
    };
  }

  public mouseMove(event) {
    if (this.dragging && this.selectedSvgElements.length > 0) {

      let pt = this.getSVGPoint(event);
      // var ele = document.querySelector(':hover');
      this.statusText = pt.x + "/" + pt.y;

      let deltaX = pt.x - this.lasttDraggingPoint.x;
      let deltaY = pt.y - this.lasttDraggingPoint.y;
      this.lasttDraggingPoint = pt;

      this.selectedSvgElements.forEach(e => {
        e.x += deltaX;
        e.y += deltaY;
      })
    }

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

    var element, elements = [];
    var old_visibility = [];
    // while (true) {
    element = document.elementFromPoint(pt.x, pt.y);
    if (element && element !== document.documentElement) {
      let index = parseInt(element.getAttribute("index"));
      let svgElement = this.getSVGElementByIndex(index);
      if (svgElement) {
        this.selectedSvgElements = [];
        this.selectedSvgElements.push(svgElement);
        this.dragging = true;
        this.lasttDraggingPoint = this.getSVGPoint(event);
      }
      else {
        this.selectedSvgElements = [];
      }

      this.statusText = element;
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
