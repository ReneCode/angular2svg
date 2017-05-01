
import { SvgTransformDirective } from '../../directives/svg-transform/svg-transform.directive';

export class SvgTransformer {
    private transform = {
        tx: 0,
        ty: 0,
        sc: 1.0
    };

    constructor(
        private svgElement: SVGSVGElement,
        private svgTransformGroup: SvgTransformDirective) {
    }

    public zoomIn(event) {
        let scale = this.transform.sc * 1.02;
        let pt = this.getSVGPoint(event);
        this.zoom(pt, scale);
    }

    public zoomOut(event) {
        let scale = this.transform.sc * 0.98;
        let pt = this.getSVGPoint(event);
        this.zoom(pt, scale);
    }

    public getSVGPoint(event) {
        let svg = this.svgElement;
        let pt = svg.createSVGPoint();

        pt.x = event.clientX;
        pt.y = event.clientY;
        pt = pt.matrixTransform(svg.getScreenCTM().inverse());

        // return pt as "un-transformed" data
        return {
            x: (pt.x - this.transform.tx) / this.transform.sc,
            y: (pt.y - this.transform.ty) / this.transform.sc
        };
    }

    private zoom(pt, scale) {
        let deltaScale = scale - this.transform.sc;
        this.transform.sc = scale;
        this.transform.tx -= deltaScale * pt.x;
        this.transform.ty -= deltaScale * pt.y;
        this.svgTransformGroup.updateTransform(this.transform);
    }
}
