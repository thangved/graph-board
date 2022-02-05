export default class Queue {
	constructor() {
		this.__data__ = [];
	}
	deQueue() {
		return this.__data__.shift();
	}
	enQueue(x) {
		this.__data__.push(x);
	}
	empty() {
		return !this.__data__.length;
	}
}
