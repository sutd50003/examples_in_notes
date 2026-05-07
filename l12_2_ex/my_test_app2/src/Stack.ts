
class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | null {
        if (!this.is_empty()) {
            return this.items[this.size()-1];
        } else {
            return null;
        }
    }

    size(): number {
        return this.items.length;
    }

    is_empty(): boolean {
        return this.items.length == 0;
    }
}

export default Stack;
