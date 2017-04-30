import { NgZone, ElementRef, OnInit, OnDestroy, Directive, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[mouse-wheel]' })
export class MouseWheelDirective implements OnInit, OnDestroy {
    @Output() mouseWheelUp = new EventEmitter();
    @Output() mouseWheelDown = new EventEmitter();

    private wheelFunc: Function;

    constructor(private ngZone: NgZone, private elementRef: ElementRef) { }

    public ngOnInit() {
        this.wheelFunc = (ev) => {
            this.mouseWheelFunc(ev);
        };

        // this.ngZone.runOutsideAngular(() => {
            // chrome
            this.elementRef.nativeElement.addEventListener('mousewheel', this.wheelFunc, false);
            // firefox
            this.elementRef.nativeElement.addEventListener('DOMMouseScroll', this.wheelFunc, false);
            // IE
            this.elementRef.nativeElement.addEventListener('onmousewheel', this.wheelFunc, false);
        // });
    }

    public ngOnDestroy() {
        this.elementRef.nativeElement.removeEventListener('mousewheel', this.wheelFunc);
    }

    private mouseWheelFunc(ev: any) {
        let event = window.event || ev; // old IE support
        let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        if (delta > 0) {
            this.mouseWheelDown.emit(event);
        } else if (delta < 0) {
            this.mouseWheelUp.emit(event);
        }
        // for IE
        event.returnValue = false;
        // for Chrome and Firefox
        if (event.preventDefault) {
            event.preventDefault();
        }
    }
}
