import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  canvas = {
    width: 600,
    height: 600
  }

  viewport = {
    x1: 0,
    y1: 0,
    x2: 600,
    y2: 600

  }

  currentId = null;
  startX;
  startY;
  elements = []

  ngOnInit() {
    this.appendElement( { type:"line", x1:30, y1:140, x2:20, y2:40} );
    this.appendElement( { type:"text", x:130, y:140, text:"hallo"} );
  }

  getViewport() {
    let vp = `${this.viewport.x1} ${this.viewport.y1} ${this.viewport.x2} ${this.viewport.y2}`
    return vp
  }


  randInt(max) {
    return Math.floor( Math.random() * max);
  }

  newLine() {
    return {
      id: null,
      type:"line",
      x1: this.randInt(this.canvas.width),
      y1: this.randInt(this.canvas.height),
      x2: this.randInt(this.canvas.width),
      y2: this.randInt(this.canvas.height)
    }
  }

  newText() {
    return {
      id: null,
      type:"text", 
      x: this.randInt(this.canvas.width), 
      y: this.randInt(this.canvas.height),
      text:"Text-" + this.randInt(100) 
    }
  }

  appendElement(ele) {
    ele.id = this.elements.length;
    this.elements.push(ele);
  }


  addLine() {
    let ele = this.newLine();
    this.appendElement(ele);
  }

  addText() {
    let ele = this.newText();
    this.appendElement(ele);
    
  }

  zoomIn() {
    let dx = this.viewport.x2 - this.viewport.x1
    let dy = this.viewport.y2 - this.viewport.y1

    if (dx > 10 &&  dx > 10) {
      this.viewport.x1 += 0.1 * dx
      this.viewport.x2 -= 0.1 * dx
      this.viewport.y1 += 0.1 * dy
      this.viewport.y2 -= 0.1 * dy
    }
  }

  zoomOut() {
    let dx = this.viewport.x2 - this.viewport.x1
    let dy = this.viewport.y2 - this.viewport.y1

    if (dx < 1000 &&  dx < 1000) {
      this.viewport.x1 -= 0.1 * dx
      this.viewport.x2 += 0.1 * dx
      this.viewport.y1 -= 0.1 * dy
      this.viewport.y2 += 0.1 * dy
    }

  }

  mouseMove(event) {
    if (this.currentId != null) {
      this.updateLine(this.currentId, event.clientX, event.clientY);
    }
  }

  mouseUp(event) {
    this.currentId = null;
  }

  mouseDown(event) {
    const id = Number(event.target.getAttribute("id"));
    const line = this.elements[id];
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.currentId = id;
  }

  updateLine(id, newX, newY) {
    let dx = newX - this.startX;
    let dy = newY - this.startY;
    this.startX += dx;
    this.startY += dy;

    var ele = this.elements[id]
    ele.x1 += dx;
    ele.y1 += dy;
    ele.x2 += dx;
    ele.y2 += dy;

    this.elements[id] = ele;

  }


}
