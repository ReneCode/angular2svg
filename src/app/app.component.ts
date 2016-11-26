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

  transform = {
    text: "",
    tx: 0,
    ty: 0,
    sc: 1.0
  }

  startX;
  startY;
  dragging = false;
  elements = []

  ngOnInit() {
    this.appendElement( { type:"line", x1:30, y1:140, x2:20, y2:40} );
    this.appendElement( { type:"text", x:130, y:140, text:"hallo"} );

    this.updateTransform();
  }


  updateTransform() {
    this.transform.text = 
        `translate(${this.transform.tx},${this.transform.ty})scale(${this.transform.sc})`;
    console.log(this.transform.text);
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
    this.transform.sc *= 1.1;
    this.updateTransform();
  }

  zoomOut() {
    this.transform.sc *= 0.9;
    this.updateTransform();
   
  }

  mouseMove(event) {
    if (this.dragging) {
      this.transform.tx += event.clientX - this.startX;
      this.transform.ty += event.clientY - this.startY;

      this.startX = event.clientX;
      this.startY = event.clientY;
      
      this.updateTransform();
    }
  }

  mouseUp(event) {
    this.dragging = false;;
  }

  mouseDown(event) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.dragging = true;
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
