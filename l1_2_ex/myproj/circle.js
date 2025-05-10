import {pi} from "./mymath.js"

class Circle {
    constructor(r) {
        this.r = r;
    }
    area() {
        return this.r**2 * pi;
    }
}

export default Circle;