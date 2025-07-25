
class Stack {
    constructor() {
        this.items = [];
    }
    push(item) {
        this.items.push(item);
    }
    pop() {
        return this.items.pop();
    }
    peek() {
        if (!this.is_empty()) {
            return this.items[this.size()-1];
        } else {
            return null;
        }
    }
    size() {
        return this.items.length;
    }
    is_empty() {
        return this.items.length == 0;
    }
}

module.exports = Stack; 