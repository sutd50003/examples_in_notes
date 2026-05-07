
import Stack from './Stack';

class MaxStack<T> {
    private items: Stack<T>;
    private maxs: Stack<T>;

    constructor() {
        this.items = new Stack<T>();
        this.maxs = new Stack<T>();
    }

    peek(): T | null {
        return this.items.peek();
    }

    max(): T | null {
        return this.maxs.peek();
    }

    push(item: T): void {
        this.items.push(item);
        let curr_max = this.max();
        if (curr_max === null || curr_max < item) {
            this.maxs.push(item);
        }
    }

    pop(): T | undefined {
        const item = this.items.pop();
        if (item !== undefined && item === this.max()) {
            this.maxs.pop();
        }
        return item;
    }

    size(): number {
        return this.items.size();
    }

}

export default MaxStack;
