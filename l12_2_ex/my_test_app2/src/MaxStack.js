
const Stack = require('./Stack.js');

class MaxStack {
    constructor() {
        this.items = new Stack(); 
        this.maxs = new Stack(); 
    }

    peek() {
        return this.items.peek();
    }

    max() {
        return this.maxs.peek();
    }

    push(item) {
        this.items.push(item); 
        let curr_max = this.max();
        if (curr_max === null || curr_max < item) {
            this.maxs.push(item);
        }
    }

    pop() {
        item = this.items.pop(); 
        if (item !== null && item === this.max()) {
            this.maxs.pop();
        }
        return item;
    }

    size() {
        return this.items.size();
    }

}

module.exports = MaxStack; 