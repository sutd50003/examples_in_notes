import { pi } from "./mymath";

export default class Circle {
    public r: number;

    constructor(r: number) {
        this.r = r;
    }

    area(): number {
        return this.r ** 2 * pi;
    }
}
