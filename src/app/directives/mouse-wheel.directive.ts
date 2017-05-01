import { NgZone, ElementRef, OnInit, OnDestroy, Directive, Input, Output, EventEmitter } from '@angular/core';

@Directive({ selector: '[mouse-wheel]' })
export class MouseWheelDirective implements OnInit, OnDestroy {
    @Output() mouseWheelUp = new EventEmitter();
    @Output() mouseWheelDown = new EventEmitter();
    @Input() runOutsideAngular: boolean = false;

    private wheelFunc: Function;
    private eventName: string;

    constructor(private ngZone: NgZone, private elementRef: ElementRef) { }

    public ngOnInit() {
        this.wheelFunc = (ev) => {
            this.mouseWheelFunc(ev);
        };


        this.eventName = 'onwheel' in document.createElement('div') ? 'wheel' : // Modern browsers support "wheel"
            document.onmousewheel !== undefined ? 'mousewheel' : // Webkit and IE support at least "mousewheel"
                'DOMMouseScroll'; // let's assume that remaining browsers are older Firefox

        console.log("### Support", this.eventName);

        let registerFunc = () => {
            // chrome
            this.elementRef.nativeElement.addEventListener(this.eventName, this.wheelFunc, false);
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
        this.elementRef.nativeElement.removeEventListener(this.eventName, this.wheelFunc);
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
