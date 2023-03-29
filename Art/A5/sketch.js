let planets = {};

function setup() {
  createCanvas(displayWidth, displayHeight);
  for (let i = 0; i < 15; i++) {
    planets[i] = {
      direction: random([-1, 1, 1, 1]),
      radius: random(1,500),
      color: 'white',
      revolution: random(10.0,300.0),
      steps: random(100,600)    
    }
  }
}

//-------------------------------------------
function draw() {

    background(0);

    for (let i = 0;  i < Object.keys(planets).length; i++) {
      planet(
        planets[i].direction,
        planets[i].radius,
        planets[i].color,
        planets[i].revolution,
        planets[i].steps
      );
    }
}

function planet(direction, r, color, revolution, steps) {
    var currStep = frameCount % steps;
    var t = map(currStep, 0, steps, 0, TWO_PI);
    var px = width / 2.0 + revolution * cos(t) * direction;
    var py = height / 2.0 + revolution * sin(t);

    noFill();
    stroke(color);
    strokeWeight(2)
    ellipse(px, py, r, r);
}

function keyPressed() {
  // this will download the first 5 seconds of the animation!
  if (key === 's') {
    saveGif('day1', 5);
  }
}
