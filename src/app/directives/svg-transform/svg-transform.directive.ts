import { Directive, ElementRef, Input, DoCheck } from '@angular/core';

@Directive({
  selector: '[appSvgTransform]'
})
export class SvgTransformDirective implements DoCheck {
  @Input() svgTransform: any;
  private oldSvgTransform: any;

  constructor(private element: ElementRef) {
  }

  public ngDoCheck() {
    if (this.svgTransformChanged()) {
      this.element.nativeElement.setAttribute('transform', this.getTransformString());
    }
  }

  private svgTransformChanged() {
    if (this.oldSvgTransform !== this.svgTransform) {
      return true;
    }
    if (this.oldSvgTransform.tx !== this.svgTransform.tx ||
      this.oldSvgTransform.ty !== this.svgTransform.ty ||
      this.oldSvgTransform.sc !== this.svgTransform.sc) {
      return true;
    }
    return false;
  }

  private getTransformString(): string {
    return `translate(${this.svgTransform.tx},${this.svgTransform.ty})scale(${this.svgTransform.sc})`;
  }

}
