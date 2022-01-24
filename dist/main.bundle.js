/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Board.js":
/*!**********************!*\
  !*** ./src/Board.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Board {\n    constructor(width, height, radius, fontSize) {\n        this.canvas = document.createElement('canvas')\n        this.context = this.canvas.getContext('2d')\n        this.radius = radius || 20\n        this.fontSize = fontSize || 25\n        this.clientPosition = { x: 0, y: 0 }\n        this.buttons = 0\n        this.shift = false\n        this.selector = ''\n\n        this.canvas.width = width || 300\n        this.canvas.height = height || 400\n\n        this.init()\n    }\n\n    init() {\n        this.canvas.onmousemove = event => {\n            this.clientPosition = {\n                x: event.clientX - this.canvas.offsetLeft + window.scrollX,\n                y: event.clientY - this.canvas.offsetTop + window.scrollY,\n            }\n            this.buttons = event.buttons\n            this.shift = event.shiftKey\n        }\n        window.onresize = event => {\n            if (this.selector)\n                this.appendTo(this.selector)\n        }\n    }\n    appendTo(selector) {\n        this.selector = selector\n        const parent = document.querySelector(selector)\n        parent.innerHTML = ''\n        parent.append(this.canvas)\n        this.canvas.width = parent.offsetWidth\n        this.canvas.height = parent.offsetHeight\n    }\n    drawCircle(x, y, r) {\n        this.context.lineWidth = 5\n        this.context.beginPath()\n        this.context.arc(x, y, r, 0, 2 * Math.PI)\n        this.context.stroke()\n        this.context.fillStyle = '#fff'\n        this.context.fill()\n        this.context.fillStyle = '#000'\n        this.context.lineWidth = 1\n    }\n    drawNode(x, y, u, active) {\n        if (active)\n            this.context.strokeStyle = '#dc3545'\n        this.drawCircle(x, y, this.radius)\n        this.context.font = `${this.fontSize}px Arial`\n        this.context.textAlign = 'center'\n        this.context.fillText(u, x, y + this.fontSize / 2)\n        this.context.strokeStyle = '#000'\n    }\n    drawLine(x1, y1, x2, y2) {\n        this.context.lineWidth = 2\n        this.context.beginPath()\n        this.context.moveTo(x1, y1)\n        this.context.lineTo(x2, y2)\n        this.context.stroke()\n        this.context.lineWidth = 1\n    }\n    drawDirected(x1, y1, x2, y2) {\n        const angle = Math.atan2(y1 - y2, x1 - x2)\n\n        const A = {\n            x: x2 + this.radius * Math.cos(angle),\n            y: y2 + this.radius * Math.sin(angle),\n        }\n\n        const M = {\n            x: A.x + this.radius * Math.cos(angle) * Math.pow(3, 1 / 2) / 2,\n            y: A.y + this.radius * Math.sin(angle) * Math.pow(3, 1 / 2) / 2,\n        }\n\n        const B = {\n            x: M.x + this.radius / 2 * Math.cos(angle - Math.PI / 2),\n            y: M.y + this.radius / 2 * Math.sin(angle - Math.PI / 2),\n        }\n\n        const C = {\n            x: M.x + this.radius / 2 * Math.cos(angle + Math.PI / 2),\n            y: M.y + this.radius / 2 * Math.sin(angle + Math.PI / 2),\n        }\n\n        this.context.lineWidth = 5\n        this.context.beginPath()\n        this.context.moveTo(A.x, A.y)\n        this.context.lineTo(B.x, B.y)\n        this.context.lineTo(C.x, C.y)\n        this.context.lineTo(A.x, A.y)\n        this.context.fillStyle = '#000'\n        this.context.stroke()\n        this.context.fill()\n        this.context.lineWidth = 1\n    }\n\n    drawDistance(x1, y1, x2, y2) {\n        const middle = {\n            x: (x1 + x2) / 2,\n            y: (y1 + y2) / 2,\n        }\n\n        const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))\n\n        this.context.fillStyle = '#000'\n        this.context.beginPath()\n        this.context.fillText(parseInt(distance / 100), middle.x, middle.y)\n        this.context.textAlign = 'center'\n        this.context.fillStyle = '#fff'\n    }\n\n    drawHorizontal(y) {\n        this.context.strokeStyle = '#fff'\n        this.context.beginPath()\n        this.context.moveTo(0, y)\n        this.context.lineTo(this.canvas.width, y)\n        this.context.stroke()\n        this.context.strokeStyle = '#000'\n    }\n    drawVertical(x) {\n        this.context.strokeStyle = '#fff'\n        this.context.beginPath()\n        this.context.moveTo(x, 0)\n        this.context.lineTo(x, this.canvas.height)\n        this.context.stroke()\n        this.context.strokeStyle = '#000'\n    }\n    drawGrid() {\n        for (let i = 0; i <= this.canvas.height; i += this.radius * 2)\n            this.drawHorizontal(i)\n        for (let i = 0; i <= this.canvas.width; i += this.radius * 2)\n            this.drawVertical(i)\n    }\n    clear() {\n        this.context.fillStyle = '#f4f8ff'\n        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)\n        this.context.fill()\n        this.context.fillStyle = '#000'\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Board);\n\n//# sourceURL=webpack://thangved-draw-graph/./src/Board.js?");

/***/ }),

/***/ "./src/Graph.js":
/*!**********************!*\
  !*** ./src/Graph.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Board */ \"./src/Board.js\");\n/* harmony import */ var _Stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Stack */ \"./src/Stack.js\");\n\n\n\nclass Graph {\n    constructor({ directed, showDistance, showGrid } = {}) {\n        this.board = new _Board__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        this.nodes = []\n        this.edges = []\n        this.functions = []\n        this.target = null\n        this.directed = directed\n        this.showDistance = showDistance\n        this.showGrid = showGrid\n\n        this.init()\n    }\n\n    init() {\n        this.board.canvas.ondblclick = event => {\n            if (this.target)\n                return\n            this.addNode(this.nodes.length + 1, this.board.clientPosition.x, this.board.clientPosition.y)\n        }\n\n        this.board.canvas.addEventListener('mousemove', event => {\n            const { x, y } = this.board.clientPosition\n            document.body.style.cursor = 'unset'\n\n            this.nodes.forEach(e => {\n                if (this.equalPoint(x, e.x) && this.equalPoint(y, e.y))\n                    this.target = this.target || e\n            })\n\n            if (!this.target)\n                return\n            if (this.board.buttons && this.board.shift)\n                document.body.style.cursor = 'move'\n            else\n                document.body.style.cursor = 'pointer'\n            if (this.board.shift || this.board.buttons === 1)\n                return\n            if (!this.equalPoint(x, this.target.x) || !this.equalPoint(y, this.target, y))\n                this.target = null\n        })\n\n        this.update()\n    }\n\n    update() {\n        this.draw()\n        this.checkAddEdge()\n        this.updateNodes()\n        setTimeout(() => {\n            this.update()\n        }, 1000 / 60)\n    }\n\n    addNode(label, x, y) {\n        const node = {\n            x: x || Math.floor(Math.random() * this.board.canvas.width),\n            y: y || Math.floor(Math.random() * this.board.canvas.height),\n            label,\n            move: 10,\n        }\n        this.nodes.push(node)\n    }\n\n    addEdge(from, to) {\n        const edge = { from, to }\n        this.edges.push(edge)\n        this.target = null\n    }\n\n    removeNode(label) {\n        this.nodes = this.nodes.filter(e => e.label !== label)\n    }\n\n    removeEdge(edge) {\n        const { from, to } = edge\n        this.edges = this.edges.filter(e => e.from !== from || e.to !== to)\n    }\n\n    draw() {\n        this.board.clear()\n        if (this.showGrid)\n            this.board.drawGrid()\n        this.drawEdges()\n        this.drawLine()\n        this.drawNodes()\n    }\n    drawNodes() {\n        this.nodes.forEach(node => {\n            this.board.drawNode(node.x, node.y, node.label, this.target?.label === node.label)\n        })\n    }\n    updateNodes() {\n        this.nodes = this.nodes.map(e => {\n            if (!this.board.buttons || this.board.shift || !this.target)\n                return this.exchange(e)\n\n            if (this.target.label === e.label) {\n                this.target = this.toClientPosition(e)\n                return this.toClientPosition(e)\n            }\n\n            return this.exchange(e)\n        })\n    }\n\n    exchange(e) {\n        if (e.move >= 0)\n            return {\n                ...e,\n                x: e.x + 0.1,\n                y: e.y + 0.1,\n                move: e.move - 0.1,\n            }\n        else if (e.move >= -10)\n            return {\n                ...e,\n                x: e.x - 0.1,\n                y: e.y - 0.1,\n                move: e.move - 0.1,\n            }\n        return {\n            ...e,\n            move: 10,\n        }\n    }\n\n    toClientPosition(e) {\n        return {\n            ...e,\n            x: this.board.clientPosition.x,\n            y: this.board.clientPosition.y,\n        }\n    }\n\n    drawEdges() {\n        this.edges.forEach(edge => this.drawEdge(edge))\n    }\n    drawLine() {\n        if (!this.board.shift || this.board.buttons !== 1 || !this.target)\n            return\n\n        const { x, y } = this.board.clientPosition\n        this.board.drawLine(this.target.x, this.target.y, x, y)\n    }\n    checkAddEdge() {\n        if (!this.target)\n            return\n        if (!this.board.shift)\n            return\n\n        const { x, y } = this.board.clientPosition\n        this.nodes.forEach(e => {\n            if (!this.target)\n                return\n            if (e.label === this.target.label)\n                return\n            if (this.equalPoint(x, e.x) && this.equalPoint(y, e.y)) {\n                this.addEdge(this.target.label, e.label)\n                this.target = null\n            }\n        })\n    }\n    drawEdge(edge) {\n        let posFrom = null\n        let posTo = null\n\n        this.nodes.forEach(e => {\n            if (e.label == edge.from)\n                posFrom = e\n\n            if (e.label == edge.to)\n                posTo = e\n        })\n        if (!posFrom || !posTo)\n            return this.removeEdge(edge)\n\n        this.board.drawLine(posFrom.x, posFrom.y, posTo.x, posTo.y)\n\n        if (this.directed)\n            this.board.drawDirected(posFrom.x, posFrom.y, posTo.x, posTo.y)\n\n        if (this.showDistance)\n            this.board.drawDistance(posFrom.x, posFrom.y, posTo.x, posTo.y)\n\n    }\n\n    exportMatrix() {\n        const matrix = []\n        const row = []\n        for (let j = 0; j <= this.nodes.length; j++)\n            row.push(0)\n        for (let i = 0; i <= this.nodes.length; i++) {\n            matrix.push([...row])\n        }\n\n        this.edges.forEach(e => {\n            matrix[e.from][e.to]++\n            if (!this.directed)\n                matrix[e.to][e.from]++\n        })\n\n        return matrix\n    }\n\n    equalPoint(p1, p2) {\n        return Math.abs(p1 - p2) <= this.board.radius\n    }\n\n    neighbours(from) {\n        const matrix = this.exportMatrix()[from]\n        const list = matrix.map((e, i) => {\n            if (e)\n                return i\n            return e\n        }).filter(e => e)\n        return list\n    }\n\n    deepFirstSearch(from) {\n        const stack = new _Stack__WEBPACK_IMPORTED_MODULE_1__[\"default\"]()\n        const marked = []\n        stack.push(from)\n\n        const steps = []\n\n        while (!stack.empty()) {\n            const u = stack.pop()\n            if (marked[u])\n                continue\n            marked[u] = true\n            const neigh = this.neighbours(u)\n            steps.push({ u, stack: [...stack.__data__], marked: [...marked], neigh })\n            neigh.forEach(e => stack.push(e))\n        }\n\n        return steps\n    }\n\n    appendTo(selector) {\n        this.board.appendTo(selector)\n    }\n\n    setDirected(directed) {\n        this.directed = directed\n    }\n    setShowGrid(showGrid) {\n        this.showGrid = showGrid\n    }\n    setShowDistance(showDistance) {\n        this.showDistance = showDistance\n    }\n\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Graph);\n\n\n//# sourceURL=webpack://thangved-draw-graph/./src/Graph.js?");

/***/ }),

/***/ "./src/Stack.js":
/*!**********************!*\
  !*** ./src/Stack.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Stack {\n    constructor() {\n        this.__data__ = []\n    }\n    push(x) {\n        this.__data__.push(x)\n    }\n    pop() {\n        return this.__data__.pop()\n    }\n    empty() {\n        return !this.__data__.length\n    }\n    top() {\n        return this.__data__[this.__data__.length - 1]\n    }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Stack);\n\n//# sourceURL=webpack://thangved-draw-graph/./src/Stack.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Graph__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Graph */ \"./src/Graph.js\");\n\nwindow.Graph = _Graph__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n\n//# sourceURL=webpack://thangved-draw-graph/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;