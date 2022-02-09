export default class Position {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	getDistance(pos1, pos2) {
		return Math.sqrt(
			Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2)
		);
	}
	getCurvePos(x1, y1, x2, y2, distance) {
		const middle = this.getMiddle(x1, y1, x2, y2);
		const angle = this.getAngle(x1, y1, x2, y2);
		return {
			x: middle.x + distance * Math.cos(angle + Math.PI / 2),
			y: middle.y + distance * Math.sin(angle + Math.PI / 2),
		};
	}
	getReverseCurvePos(x1, y1, x2, y2, px, py) {
		const middle = this.getMiddle(x1, y1, x2, y2);
		const angle = this.getAngle(x1, y1, x2, y2);

		return (
			(px - middle.x) / Math.cos(angle + Math.PI / 2) +
			(py - middle.y) / Math.sin(angle + Math.PI / 2)
		);
	}
	getMiddle(x1, y1, x2, y2) {
		return {
			x: (x1 + x2) / 2,
			y: (y1 + y2) / 2,
		};
	}
	getAngle(x1, y1, x2, y2) {
		return Math.atan2(y1 - y2, x1 - x2);
	}
	ratioLine(pos1, pos2, ratio) {
		ratio = 1 - ratio;
		const distance = this.getDistance(pos1, pos2);
		const miss = distance * ratio;
		const angle = this.getAngle(pos1.x, pos1.y, pos2.x, pos2.y);
		return {
			from: pos1,
			to: {
				x: pos2.x + miss * Math.cos(angle),
				y: pos2.y + miss * Math.sin(angle),
			},
		};
	}
}
