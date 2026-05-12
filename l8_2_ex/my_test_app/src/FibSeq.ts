class FibSeq {
    prev: number;
    curr: number;

    constructor() {
        this.prev = 0;
        this.curr = 1;
    }
    next(): number {
        let res = this.prev + this.curr;
        this.prev = this.curr;
        this.curr = res;
        return res;
    }
}

export = FibSeq;