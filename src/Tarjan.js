import Stack from "./Stack";
import Graph from "./Graph";

export default class Tarjan {
	/**
	 * @param {Graph} graph
	 */
	constructor(graph) {
		this.stack = new Stack();
		this.step = 1;
		this.num = [];
		this.minNum = [];
		this.linkedParts = [];
		this.graph = graph;
	}

	tarjan() {
		this.graph.nodes.forEach((node) => {
			if (this.num[node.label]) return;
			this.__tarjan(node.label);
		});
		return this.linkedParts;
	}
	__tarjan(from) {
		if (this.num[from]) return this.linkedParts;

		this.num[from] = this.step;
		this.minNum[from] = this.step;
		this.step++;
		this.stack.push(from);

		const neighbours = this.graph.neighbours(from);

		neighbours.forEach((neighbour) => {
			if (this.stack.includes(neighbour))
				return (this.minNum[from] = Math.min(
					this.num[neighbour],
					this.minNum[from]
				));

			this.__tarjan(neighbour);
			this.minNum[from] = Math.min(
				this.minNum[neighbour],
				this.minNum[from]
			);
		});

		if (this.num[from] !== this.minNum[from]) return this.linkedParts;

		const linked = [];
		while (this.stack.top() !== from) linked.push(this.stack.pop());

		linked.push(this.stack.pop());

		this.linkedParts.push(linked);

		return this.linkedParts;
	}
}
