import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[svg-transform]',
  exportAs: 'svg-transform'
})
export class SvgTransformDirective {

  constructor(private element: ElementRef) {
  }

  public updateTransform(transform) {
    let transformString = `translate(${transform.tx},${transform.ty})scale(${transform.sc})`;
    this.element.nativeElement.setAttribute('transform', transformString);
  }

}
