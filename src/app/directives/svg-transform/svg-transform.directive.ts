import { Directive, ElementRef, Input, DoCheck } from '@angular/core';

@Directive({
  selector: '[appSvgTransform]'
})
export class SvgTransformDirective implements DoCheck {
  @Input() svgTransform: any;

  constructor(private element: ElementRef) {
  }

  private getTransformString(): string {
    return `translate(${this.svgTransform.tx},${this.svgTransform.ty})scale(${this.svgTransform.sc})`;
  }

  public ngDoCheck() {
    this.element.nativeElement.setAttribute('transform', this.getTransformString());

  }

}
