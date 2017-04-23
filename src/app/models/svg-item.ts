
export class SvgItem {
    public type: string;
    public id: number;
    public selected: boolean;
    public bbox: SVGRect = undefined;

    constructor(type: string) {
        this.type = type;
    }

};
