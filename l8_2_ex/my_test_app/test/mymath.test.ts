import { sum } from '../src/mymath';

describe("mymath sum tests", () => {
    test ("summing of two positive numbers", () => {
        const result = sum(1,2);
        expect(result).toBe(3);
    })
    test ("summing of two negative numbers", () => {
        const result = sum(-3,-2);
        expect(result).toBe(-5);
    })
})