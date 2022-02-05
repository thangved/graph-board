import Board from "./Board";
import Queue from "./Queue";
import Stack from "./Stack";

class Graph {
	constructor({
		directed,
		showDistance,
		showGrid,
		radius,
		character,
		motion,
	} = {}) {
		this.alphabet = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		this.board = new Board({ radius });
		this.nodes = [];
		this.edges = [];
		this.target = null;
		this.selectedEdgeId = null;
		this.directed = directed;
		this.showDistance = showDistance;
		this.showGrid = showGrid;
		this.character = character;
		this.motionSteps = { step: 0, steps: [] };
		this.onchange = Function;
		this.motion = motion;

		this.init();
	}

	init() {
		this.board.canvas.ondblclick = () => {
			if (this.target) return;
			this.addNode(
				this.nodes.length + 1,
				this.board.clientPosition.x,
				this.board.clientPosition.y
			);
		};

		this.board.canvas.addEventListener("mousemove", () => {
			const { x, y } = this.board.clientPosition;
			document.body.style.cursor = "unset";

			this.edges.map((edge, index) => {
				if (this.board.buttons === 1) return;
				const from = this.nodes[edge.from - 1];
				const to = this.nodes[edge.to - 1];

				if (!from || !to) return;

				const curvePos = this.board.getCurvePos(
					from.x,
					from.y,
					to.x,
					to.y,
					edge.curve
				);
				const distance = this.board.getDistance(curvePos, { x, y });

				if (distance < this.board.radius) this.selectedEdgeId = index;
				if (this.target) this.selectedEdgeId = null;
			});

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

		this.render();
	}

	render() {
		this.update();
		this.draw();
		setTimeout(() => {
			this.render();
		}, 1000 / 60);
	}

	update() {
		this.checkAddEdge();
		this.updateCurve();
		this.updateNodes();
		this.updateMotion();
	}
	draw() {
		this.board.clear();
		if (this.showGrid) this.board.drawGrid();
		this.drawEdges();
		this.drawLine();
		this.drawNodes();
		this.drawMotions();
	}

	updateCurve() {
		if (this.board.buttons !== 1 || this.selectedEdgeId === null) return;
		if (this.target) return;
		this.onchange();
		this.edges[this.selectedEdgeId].curve +=
			this.board.clientPosition.x - this.board.prevPosition.x;
	}

	updateNodes() {
		this.nodes = this.nodes.map((e) => {
			if (!this.board.buttons || this.board.shift || !this.target)
				return this.motion ? this.magicFunction(e) : e;

			if (this.target.label === e.label) {
				this.target = this.toClientPosition(e);
				this.onchange();
				return this.toClientPosition(e);
			}

			return this.motion ? this.magicFunction(e) : e;
		});
	}

	updateMotion() {
		if (!this.motionSteps.steps?.length) return;

		let updated = false;
		this.motionSteps.steps = this.motionSteps.steps.map((step, index) => {
			if (index > this.motionSteps.step)
				return {
					...step,
					step: 0,
				};
			if (step.step >= 1 || updated) return step;
			updated = true;
			return {
				...step,
				step: (step.step += 1e-2),
			};
		});
	}

	drawMotions() {
		this.motionSteps.steps.forEach((motion) => this.drawMotion(motion));
	}

	drawMotion(motion) {
		if (!this.nodes[motion.from - 1] || !this.nodes[motion.to - 1]) return;
		motion = this.board.position.ratioLine(
			this.nodes[motion.from - 1],
			this.nodes[motion.to - 1],
			motion.step
		);
		this.board.drawMotionLine(
			motion.from.x,
			motion.from.y,
			motion.to.x,
			motion.to.y
		);
	}

	addNode(label, x, y) {
		const node = {
			x: x || Math.floor(Math.random() * this.board.canvas.width),
			y: y || Math.floor(Math.random() * this.board.canvas.height),
			label,
			move: 10,
		};
		this.nodes.push(node);
		this.onchange();
	}

	addEdge(from, to) {
		const edge = { from, to, curve: Math.random() * 100 };
		this.edges.push(edge);
		this.target = null;
		this.onchange();
	}

	removeNode(label) {
		this.nodes = this.nodes.filter((e) => e.label !== label);
		this.onchange();
	}

	removeEdge(edge) {
		const { from, to } = edge;
		this.edges = this.edges.filter((e) => e.from !== from || e.to !== to);
		this.onchange();
	}

	drawNodes() {
		this.nodes.forEach((node) => {
			this.board.drawNode(
				node.x,
				node.y,
				this.character ? this.alphabet[node.label] : node.label,
				this.target?.label === node.label
			);
		});
	}

	magicFunction(e) {
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

		this.board.drawCurve(
			posFrom.x,
			posFrom.y,
			posTo.x,
			posTo.y,
			edge.curve
		);

		if (this.directed)
			this.board.drawDirected(
				posFrom.x,
				posFrom.y,
				posTo.x,
				posTo.y,
				edge.curve
			);

		if (this.showDistance)
			this.board.drawDistance(
				posFrom.x,
				posFrom.y,
				posTo.x,
				posTo.y,
				edge.curve
			);
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
		const marked = [];
		const stack = new Stack();
		let steps = [];

		stack.push({ to: from });
		while (!stack.empty()) {
			const top = stack.top();
			stack.pop();

			if (marked[top.to]) continue;

			marked[top.to] = true;
			steps.push(top);
			const neighbours = this.neighbours(top.to);

			neighbours.reverse().forEach((node) => {
				stack.push({ from: top.to, to: node });
			});
		}

		steps = {
			step: 0,
			steps: steps
				.filter((step) => step.from)
				.map((step) => ({
					...step,
					step: 0,
				})),
		};

		this.motionStart(steps);
		return steps;
	}

	breadthFirstSearch(from) {
		const marked = [];
		const queue = new Queue();
		let steps = [];

		queue.enQueue({ to: from });

		while (!queue.empty()) {
			const front = queue.deQueue();
			if (marked[front.to]) continue;

			marked[front.to] = true;
			steps.push(front);
			const neighbours = this.neighbours(front.to);
			neighbours.forEach((node) => {
				queue.enQueue({ from: front.to, to: node });
			});
		}

		steps = {
			step: 0,
			steps: steps
				.filter((node) => node.from)
				.map((node) => ({
					...node,
					step: 0,
				})),
		};
		this.motionStart(steps);
		return steps;
	}

	appendTo(selector) {
		this.board.appendTo(selector);
	}

	motionStart(motionSteps) {
		this.motionSteps = motionSteps;
		this.onchange();
	}

	motionStop() {
		this.motionSteps.step = 0;
		this.motionSteps.steps = [];
		this.onchange();
	}

	nextStep() {
		if (this.motionSteps.step === this.motionSteps.step - 1)
			return this.motionSteps.step;
		this.onchange();
		return ++this.motionSteps.step;
	}
	prevStep() {
		if (this.motionSteps.step === 0) return this.motionSteps.step;
		this.onchange();
		return --this.motionSteps.step;
	}

	// GETTER
	getNodes() {
		return this.nodes.map((node) => ({
			...this.edges,
			label: this.character ? this.alphabet[node.label] : node.label,
		}));
	}
	getEdges() {
		return this.edges.map((edge) => ({
			...edge,
			from: this.character ? this.alphabet[edge.from] : edge.from,
			to: this.character ? this.alphabet[edge.to] : edge.label,
		}));
	}

	// SETTER
	setDirected(directed) {
		this.directed = directed;
		this.onchange();
	}
	setShowGrid(showGrid) {
		this.showGrid = showGrid;
		this.onchange();
	}
	setShowDistance(showDistance) {
		this.showDistance = showDistance;
		this.onchange();
	}

	setRadius(radius) {
		this.board.radius = radius;
		this.onchange();
	}
	setMotion(motion) {
		this.motion = motion;
		this.onchange();
	}
	setCharacter(character) {
		this.character = character;
		this.onchange();
	}
}

export default Graph;
