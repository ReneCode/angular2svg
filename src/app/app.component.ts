import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  currentId = null;
  startX;
  startY;
  elements = []

  ngOnInit() {
    this.appendElement(
      { type:"line", x1:30, y1:140, x2:20, y2:40}
    );
  }

  randInt(max) {
    return Math.floor( Math.random() * max);
  }

  newElement() {
    return {
      id: null,
      type:"line",
      x1: this.randInt(400),
      y1: this.randInt(400),
      x2: this.randInt(400),
      y2: this.randInt(400)
    }
  }

  appendElement(ele) {
    ele.id = this.elements.length;
    this.elements.push(ele);
  }


  onAdd() {
    let ele = this.newElement();
    this.appendElement(ele);
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
    console.log(dx + "/" + dy);
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
