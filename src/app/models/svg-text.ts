
import { SvgItem } from './svg-item';

export class SvgText extends SvgItem {
    public text: string;
    public x: number;
    public y: number;

    constructor(text: string, x: number, y: number) {
        super('text');
        this.text = text;
        this.x = x;
        this.y = y;
    }

}

