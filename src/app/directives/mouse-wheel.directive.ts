import { NgZone, ElementRef, OnInit, OnDestroy, Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[mouse-wheel]' })
export class MouseWheelDirective implements OnInit, OnDestroy {
    @Output() mouseWheelUp = new EventEmitter();
    @Output() mouseWheelDown = new EventEmitter();
    @Input() runOutsideAngular: boolean = false;

    private wheelFunc: Function;

    constructor(private ngZone: NgZone, private elementRef: ElementRef) { }

    public ngOnInit() {
        this.wheelFunc = (ev) => {
            this.mouseWheelFunc(ev);
        };


        const support = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
            document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
                'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox

        console.log("### Support", support);

        let registerFunc = () => {
            // chrome
            this.elementRef.nativeElement.addEventListener('wheel', this.wheelFunc, false);
            // firefox
            this.elementRef.nativeElement.addEventListener('DOMMouseScroll', this.wheelFunc, false);
            // IE
            this.elementRef.nativeElement.addEventListener('onmousewheel', this.wheelFunc, false);
        };
        if (this.runOutsideAngular) {
            this.ngZone.runOutsideAngular(() => {
                registerFunc();
            });
        } else {
            registerFunc();
        }
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
