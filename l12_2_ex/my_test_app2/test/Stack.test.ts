import Stack from '../src/Stack';

describe("Stack push tests", () => {
    let stack: Stack<number> | null = null;
    beforeEach(() => {
        stack = new Stack<number>();
    });

    afterEach(() => {
        stack = null;
    })
    // test case 1: empty stack
    // expected output, stack size is 0
    test ("an empty stack should have 0 size", () => {
        expect(stack!.size()).toBe(0);
    })
    // test case 2:
    // starting from an empty stack, push 1 item into the stack
    // expected output, stack size is 1
    test ("an empty stack after pushing 1 item should have size 1", () => {
        stack!.push(1);
        expect(stack!.size()).toBe(1);
    })
    // test case 3:
    // starting from an empty stack, push 2 items into the stack
    // expected output, stack size is 2

    // test case 4:
    // starting from an empty stack, push 3 items into the stack
    // expected output, stack size is 3


})


