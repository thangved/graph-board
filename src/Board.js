class Board {
    constructor(width, height, radius, fontSize) {
        this.canvas = document.createElement('canvas')
        this.context = this.canvas.getContext('2d')
        this.radius = radius || 20
        this.fontSize = fontSize || 25
        this.clientPosition = { x: 0, y: 0 }
        this.buttons = 0
        this.shift = false
        this.selector = ''

        this.canvas.width = width || 300
        this.canvas.height = height || 400

        this.init()
    }

    init() {
        this.canvas.onmousemove = event => {
            this.clientPosition = {
                x: event.clientX - this.canvas.offsetLeft + window.scrollX,
                y: event.clientY - this.canvas.offsetTop + window.scrollY,
            }
            this.buttons = event.buttons
            this.shift = event.shiftKey
        }
        window.onresize = event => {
            if (this.selector)
                this.appendTo(this.selector)
        }
    }
    appendTo(selector) {
        this.selector = selector
        const parent = document.querySelector(selector)
        parent.innerHTML = ''
        parent.append(this.canvas)
        this.canvas.width = parent.offsetWidth
        this.canvas.height = parent.offsetHeight
    }
    drawCircle(x, y, r) {
        this.context.lineWidth = 5
        this.context.beginPath()
        this.context.arc(x, y, r, 0, 2 * Math.PI)
        this.context.stroke()
        this.context.fillStyle = '#fff'
        this.context.fill()
        this.context.fillStyle = '#000'
        this.context.lineWidth = 1
    }
    drawNode(x, y, u, active) {
        if (active)
            this.context.strokeStyle = '#dc3545'
        this.drawCircle(x, y, this.radius)
        this.context.font = `${this.fontSize}px Arial`
        this.context.textAlign = 'center'
        this.context.fillText(u, x, y + this.fontSize / 2)
        this.context.strokeStyle = '#000'
    }
    drawLine(x1, y1, x2, y2) {
        this.context.lineWidth = 2
        this.context.beginPath()
        this.context.moveTo(x1, y1)
        this.context.lineTo(x2, y2)
        this.context.stroke()
        this.context.lineWidth = 1
    }
    drawDirected(x1, y1, x2, y2) {
        const angle = Math.atan2(y1 - y2, x1 - x2)

        const A = {
            x: x2 + this.radius * Math.cos(angle),
            y: y2 + this.radius * Math.sin(angle),
        }

        const M = {
            x: A.x + this.radius * Math.cos(angle) * Math.pow(3, 1 / 2) / 2,
            y: A.y + this.radius * Math.sin(angle) * Math.pow(3, 1 / 2) / 2,
        }

        const B = {
            x: M.x + this.radius / 2 * Math.cos(angle - Math.PI / 2),
            y: M.y + this.radius / 2 * Math.sin(angle - Math.PI / 2),
        }

        const C = {
            x: M.x + this.radius / 2 * Math.cos(angle + Math.PI / 2),
            y: M.y + this.radius / 2 * Math.sin(angle + Math.PI / 2),
        }

        this.context.lineWidth = 5
        this.context.beginPath()
        this.context.moveTo(A.x, A.y)
        this.context.lineTo(B.x, B.y)
        this.context.lineTo(C.x, C.y)
        this.context.lineTo(A.x, A.y)
        this.context.fillStyle = '#000'
        this.context.stroke()
        this.context.fill()
        this.context.lineWidth = 1
    }

    drawDistance(x1, y1, x2, y2) {
        const middle = {
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2,
        }

        const distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

        this.context.fillStyle = '#000'
        this.context.beginPath()
        this.context.fillText(parseInt(distance / 100), middle.x, middle.y)
        this.context.textAlign = 'center'
        this.context.fillStyle = '#fff'
    }

    drawHorizontal(y) {
        this.context.strokeStyle = '#fff'
        this.context.beginPath()
        this.context.moveTo(0, y)
        this.context.lineTo(this.canvas.width, y)
        this.context.stroke()
        this.context.strokeStyle = '#000'
    }
    drawVertical(x) {
        this.context.strokeStyle = '#fff'
        this.context.beginPath()
        this.context.moveTo(x, 0)
        this.context.lineTo(x, this.canvas.height)
        this.context.stroke()
        this.context.strokeStyle = '#000'
    }
    drawGrid() {
        for (let i = 0; i <= this.canvas.height; i += this.radius * 2)
            this.drawHorizontal(i)
        for (let i = 0; i <= this.canvas.width; i += this.radius * 2)
            this.drawVertical(i)
    }
    clear() {
        this.context.fillStyle = '#f4f8ff'
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fill()
        this.context.fillStyle = '#000'
    }

}

export default Board