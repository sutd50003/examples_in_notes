export class FibSeq {
    prev = 0;
    curr = 1;

    next(): number {
        const res = this.prev + this.curr;
        this.prev = this.curr;
        this.curr = res;
        return res;
    }
}