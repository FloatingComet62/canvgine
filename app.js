const player = new Body(Math.random() * 100, Math.random() * 100, 32, 64, "player.png")
player.draw = () => {
  player.setX(mouse.x)
  player.setY(mouse.y)
}
addObject(player)

function loop() { }
run()