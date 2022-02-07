import Stack from "./Stack";

export default class Tarjan {
	constructor(graph) {
		this.stack = new Stack();
		this.step = 0;
		this.num = [];
		this.minNum = [];
		this.linkedParts = [];
		this.graph = graph;
	}

	tarjan(from) {
		const { num, minNum, stack, linkedParts } = this;
		num[from] = this.step;
		minNum[from] = this.step;
		this.step++;
		stack.push(from);

		const neighbours = this.graph.neighbours(from);

		neighbours.forEach((neighbour) => {
			if (stack.includes(neighbour))
				return (minNum[from] = Math.min(num[neighbour], minNum[from]));
			if (!num[neighbour]) {
				this.tarjan(neighbour);
				minNum[from] = Math.min(minNum[neighbour], minNum[from]);
			}
		});

		if (num[from] !== minNum[from]) return;
		const linked = [];
		while (stack.top() !== from) linked.push(stack.pop());
		linked.push(stack.pop());

		linkedParts.push(linked);

		return this.linkedParts;
	}
}
