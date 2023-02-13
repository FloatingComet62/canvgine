const player = new Body(0, 0, 10, 10, "player.png")
player.draw = () => {
  player.setX(mouse.x)
  player.setY(mouse.y)
}
addObject(player)

function loop() { }
run()