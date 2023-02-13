"use strict"

document.title = pageTitle

const canvas = document.getElementById("app")
const context = canvas.getContext("2d")
context.font = "20px Arial"
const width = canvas.width
const height = canvas.height
const objects = []
const mouse = { x: 0, y: 0 }

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

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)