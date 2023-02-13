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