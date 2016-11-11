import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  elements = [
    { type:"line", x1:30, y1:140, x2:20, y2:40}
  ]

  randInt(max) {
    return Math.floor( Math.random() * max);
  }

  newElement() {
    return {
      type:"line",
      x1: this.randInt(400),
      y1: this.randInt(400),
      x2: this.randInt(400),
      y2: this.randInt(400)
    }
  }

  onAdd() {
    this.elements.push( this.newElement() )
  }
}
