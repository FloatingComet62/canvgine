"use strict"

const canvas = document.getElementById("app")
const context = canvas.getContext("2d")
context.font = "20px Arial"
const width = canvas.width
const height = canvas.height
const objects = []
const mouse = { x: 0, y: 0 }

// -------
const background = "#151515"
const renderFromCenterElseCorner = true
// -------

document.onmousemove = (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * width / rect.width
    mouse.y = (e.clientY - rect.top) * height / rect.height
}

function addObject(obj) {
    objects.push(obj)
}
function addObjects(objs) {
    objects.concat(objs)
}
function run() {
    context.clearRect(0, 0, width, height)
    context.fillStyle = background
    context.fillRect(0, 0, width, height)
    loop()
    for (const object of objects) {
        if (Object.keys(object).includes("draw")) object.draw()
        if (object.visible) object.display()
    }
    requestAnimationFrame(run)
}

class ContextImage {
    constructor(url) {
        this.body = new Image()
        this.body.src = `assets/${url}`
    }
    draw(x, y, size) {
        context.drawImage(this.body, x, y, size[0], size[1])
    }
}
class ContextText {
    constructor(message, position, color = "black") {
        context.fillStyle = color
        context.fillText(message, position[0], position[1])
    }
}
class Body {
    constructor(x, y, width, height, sprite) {
        this.width = width
        this.height = height
        this.visible = true
        this.setX(x)
        this.setY(y)
        this.img = new ContextImage(sprite)
    }
    setX(x) {
        this.x = x
        if (renderFromCenterElseCorner) this.x -= this.width / 2
    }
    setY(y) {
        this.y = y
        if (renderFromCenterElseCorner) this.y -= this.height / 2
    }

    display() {
        this.x = clamp(this.x, 0, width - this.width)
        this.y = clamp(this.y, 0, height - this.height)
        this.img.draw(this.x, this.y, [this.width, this.height])
    }
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)