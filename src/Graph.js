import Board from "./Board";
import Stack from "thangved-stack";

class Graph {
	constructor({ directed, showDistance, showGrid, radius } = {}) {
		this.board = new Board({ radius });
		this.nodes = [];
		this.edges = [];
		this.functions = [];
		this.target = null;
		this.directed = directed;
		this.showDistance = showDistance;
		this.showGrid = showGrid;

		this.init();
	}

	init() {
		this.board.canvas.ondblclick = (event) => {
			if (this.target) return;
			this.addNode(
				this.nodes.length + 1,
				this.board.clientPosition.x,
				this.board.clientPosition.y
			);
		};

		this.board.canvas.addEventListener("mousemove", (event) => {
			const { x, y } = this.board.clientPosition;
			document.body.style.cursor = "unset";

			this.nodes.forEach((e) => {
				if (this.equalPoint(x, e.x) && this.equalPoint(y, e.y))
					this.target = this.target || e;
			});

			if (!this.target) return;
			if (this.board.buttons && this.board.shift)
				document.body.style.cursor = "move";
			else document.body.style.cursor = "pointer";
			if (this.board.shift || this.board.buttons === 1) return;
			if (
				!this.equalPoint(x, this.target.x) ||
				!this.equalPoint(y, this.target, y)
			)
				this.target = null;
		});

		this.update();
	}

	update() {
		this.draw();
		this.checkAddEdge();
		this.updateNodes();
		setTimeout(() => {
			this.update();
		}, 1000 / 60);
	}

	addNode(label, x, y) {
		const node = {
			x: x || Math.floor(Math.random() * this.board.canvas.width),
			y: y || Math.floor(Math.random() * this.board.canvas.height),
			label,
			move: 10,
		};
		this.nodes.push(node);
	}

	addEdge(from, to) {
		const edge = { from, to };
		this.edges.push(edge);
		this.target = null;
	}

	removeNode(label) {
		this.nodes = this.nodes.filter((e) => e.label !== label);
	}

	removeEdge(edge) {
		const { from, to } = edge;
		this.edges = this.edges.filter((e) => e.from !== from || e.to !== to);
	}

	draw() {
		this.board.clear();
		if (this.showGrid) this.board.drawGrid();
		this.drawEdges();
		this.drawLine();
		this.drawNodes();
	}
	drawNodes() {
		this.nodes.forEach((node) => {
			this.board.drawNode(
				node.x,
				node.y,
				node.label,
				this.target?.label === node.label
			);
		});
	}
	updateNodes() {
		this.nodes = this.nodes.map((e) => {
			if (!this.board.buttons || this.board.shift || !this.target)
				return this.exchange(e);

			if (this.target.label === e.label) {
				this.target = this.toClientPosition(e);
				return this.toClientPosition(e);
			}

			return this.exchange(e);
		});
	}

	exchange(e) {
		if (e.move >= 0)
			return {
				...e,
				x: e.x + 0.1,
				y: e.y + 0.1,
				move: e.move - 0.1,
			};
		else if (e.move >= -10)
			return {
				...e,
				x: e.x - 0.1,
				y: e.y - 0.1,
				move: e.move - 0.1,
			};
		return {
			...e,
			move: 10,
		};
	}

	toClientPosition(e) {
		return {
			...e,
			x: this.board.clientPosition.x,
			y: this.board.clientPosition.y,
		};
	}

	drawEdges() {
		this.edges.forEach((edge) => this.drawEdge(edge));
	}
	drawLine() {
		if (!this.board.shift || this.board.buttons !== 1 || !this.target)
			return;

		const { x, y } = this.board.clientPosition;
		this.board.drawLine(this.target.x, this.target.y, x, y);
	}
	checkAddEdge() {
		if (!this.target) return;
		if (!this.board.shift) return;

		const { x, y } = this.board.clientPosition;
		this.nodes.forEach((e) => {
			if (!this.target) return;
			if (e.label === this.target.label) return;
			if (this.equalPoint(x, e.x) && this.equalPoint(y, e.y)) {
				this.addEdge(this.target.label, e.label);
				this.target = null;
			}
		});
	}
	drawEdge(edge) {
		let posFrom = null;
		let posTo = null;

		this.nodes.forEach((e) => {
			if (e.label == edge.from) posFrom = e;

			if (e.label == edge.to) posTo = e;
		});
		if (!posFrom || !posTo) return this.removeEdge(edge);

		this.board.drawLine(posFrom.x, posFrom.y, posTo.x, posTo.y);

		if (this.directed)
			this.board.drawDirected(posFrom.x, posFrom.y, posTo.x, posTo.y);

		if (this.showDistance)
			this.board.drawDistance(posFrom.x, posFrom.y, posTo.x, posTo.y);
	}

	exportMatrix() {
		const matrix = [];
		const row = [];
		for (let j = 0; j <= this.nodes.length; j++) row.push(0);
		for (let i = 0; i <= this.nodes.length; i++) {
			matrix.push([...row]);
		}

		this.edges.forEach((e) => {
			matrix[e.from][e.to]++;
			if (!this.directed) matrix[e.to][e.from]++;
		});

		return matrix;
	}

	equalPoint(p1, p2) {
		return Math.abs(p1 - p2) <= this.board.radius;
	}

	neighbours(from) {
		const matrix = this.exportMatrix()[from];
		const list = matrix
			.map((e, i) => {
				if (e) return i;
				return e;
			})
			.filter((e) => e);
		return list;
	}

	deepFirstSearch(from) {
		const stack = new Stack();
		const marked = [];
		stack.push(from);

		const steps = [];

		while (!stack.empty()) {
			const u = stack.pop();
			if (marked[u]) continue;
			marked[u] = true;
			const neigh = this.neighbours(u);
			steps.push({
				u,
				stack: [...stack.__data__],
				marked: [...marked],
				neigh,
			});
			neigh.forEach((e) => stack.push(e));
		}

		return steps;
	}

	appendTo(selector) {
		this.board.appendTo(selector);
	}

	setDirected(directed) {
		this.directed = directed;
	}
	setShowGrid(showGrid) {
		this.showGrid = showGrid;
	}
	setShowDistance(showDistance) {
		this.showDistance = showDistance;
	}

	setRadius(radius) {
		this.board.radius = radius;
	}
}

export default Graph;
