class Stack {
    constructor() {
        this.__data__ = []
    }
    push(x) {
        this.__data__.push(x)
    }
    pop() {
        return this.__data__.pop()
    }
    empty() {
        return !this.__data__.length
    }
    top() {
        return this.__data__[this.__data__.length - 1]
    }
}

export default Stack